import ollama from 'ollama'
import fs from 'fs'
import path from 'path'

interface ParseOptions {
  page: string
  batch?: string  // For batch processing like "001-005" or "all"
  concurrent?: number  // Max concurrent operations
}

function parseArgs(): ParseOptions {
  const args = process.argv.slice(2)
  const pageArg = args.find(arg => arg.startsWith('--page='))
  const batchArg = args.find(arg => arg.startsWith('--batch='))
  const concurrentArg = args.find(arg => arg.startsWith('--concurrent='))
  
  if (!pageArg && !batchArg) {
    console.error('❌ Error: --page or --batch parameter is required')
    console.log('Usage: bun parse --page="006"')
    console.log('   or: bun parse --batch="001-005"')
    console.log('   or: bun parse --batch="all" --concurrent=3')
    process.exit(1)
  }
  
  const page = pageArg ? pageArg.split('=')[1].replace(/['"]/g, '') : ''
  const batch = batchArg ? batchArg.split('=')[1].replace(/['"]/g, '') : undefined
  const concurrent = concurrentArg ? parseInt(concurrentArg.split('=')[1]) : 2
  
  return { page, batch, concurrent }
}

async function readImageAsBase64(imagePath: string): Promise<string> {
  try {
    const imageBuffer = fs.readFileSync(imagePath)
    
    // Log image size for debugging
    const stats = fs.statSync(imagePath)
    console.log(`📊 Image size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`)
    
    const base64Image = imageBuffer.toString('base64')
    return base64Image // Return just the base64 string, not data URL
  } catch (error) {
    throw new Error(`Failed to read image: ${imagePath}`)
  }
}

async function parseImageToHTML(imagePath: string, pageNumber: string, retries: number = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🖼️  Reading image: ${imagePath} (attempt ${attempt}/${retries})`)
      const base64Image = await readImageAsBase64(imagePath)
      
      console.log('🤖 Processing with Qwen2.5-VL...')
      console.log('⏳ This may take a few minutes for complex documents...')
      
      const prompt = `
      You are an AI specialized in recognizing and extracting text from images.
      The files images are pages of a journal called "La Gazeta de Buenos Ayres" published in spanish, in the early 1800.
      Some pages are organized in columns, others have tables, and some have images.
      Extract all text from this document image and convert it to clean HTML.
      Instructions:
      - Extract ALL visible text accurately
      - Use semantic HTML tags: <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, <p>, <ul>, <li>, <em>, <strong>.
      - Preserve the document structure and layout
      - Do NOT include <html>, <head>, or <body> tags
      - Do NOT wrap output in markdown code blocks
      - Return ONLY the HTML content
      - If you see repeated text, list each unique item only once
      
      Return the HTML directly without any markdown formatting.`

      const response = await ollama.chat({
        model: 'qwen2.5vl',
        messages: [
          {
            role: 'system',
            content: 'You are an AI specialized in historical document digitization and OCR. You excel at extracting text from old Spanish colonial documents while preserving their structure and formatting.'
          },
          {
            role: 'user',
            content: prompt,
            images: [base64Image]
          }
        ],
        options: {
          temperature: 0.1,
          top_p: 0.001,           // More focused sampling
          repeat_penalty: 1.05,   // Reduce repetition
          num_predict: 4000,      // Increased for complex documents
          stop: []                // Custom stop tokens if needed
        }
      })

      return response.message.content
      
    } catch (error) {
      console.error(`❌ Error processing image (attempt ${attempt}/${retries}):`, error)
      if (attempt === retries) {
        throw error
      }
      // Wait before retry (exponential backoff)
      const waitTime = Math.pow(2, attempt) * 1000
      console.log(`⏳ Retrying in ${waitTime / 1000} seconds...`)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }
  
  throw new Error('Failed to process image after all retries')
}

function createContentFile(htmlContent: string, pageNumber: string): string {
  // Clean up the HTML content
  let cleanedHTML = htmlContent
    // Remove markdown code blocks
    .replace(/```html\n?/gi, '')
    .replace(/```\n?/gi, '')
    // Remove any remaining markdown
    .replace(/```[a-z]*\n?/gi, '')
    // Clean up malformed tags
    .trim()

  // Remove duplicate list items
  cleanedHTML = deduplicateListItems(cleanedHTML)

  // Ensure the HTML is properly closed
  if (!cleanedHTML.endsWith('>')) {
    // Find the last incomplete tag and try to close it
    const lastTagMatch = cleanedHTML.match(/<([a-zA-Z]+)[^>]*$/);
    if (lastTagMatch) {
      const tagName = lastTagMatch[1];
      cleanedHTML = cleanedHTML.substring(0, cleanedHTML.lastIndexOf('<')) + `</${tagName}>`;
    }
  }

  // Return JSON format that's easy to render
  return JSON.stringify({
    pageNumber: parseInt(pageNumber),
    content: cleanedHTML,
    generatedAt: new Date().toISOString()
  }, null, 2)
}

function deduplicateListItems(html: string): string {
  // Find all list items and remove duplicates
  const listItemRegex = /<li>(.*?)<\/li>/gi
  const listItems = new Set<string>()
  
  return html.replace(listItemRegex, (match, content) => {
    const trimmedContent = content.trim()
    if (listItems.has(trimmedContent)) {
      return '' // Remove duplicate
    }
    listItems.add(trimmedContent)
    return match
  })
}

async function saveOutputFile(content: string, filename: string): Promise<void> {
  try {
    fs.writeFileSync(filename, content, 'utf8')
    console.log('✅ TSX file created:', filename)
  } catch (error) {
    throw new Error(`Failed to save file: ${filename}`)
  }
}

async function processSinglePage(page: string): Promise<void> {
  // Construct file paths
  const imagePath = path.join(process.cwd(), 'public', 'bucket', `gazeta_${page}.jpg`)
  const outputPath = path.join(process.cwd(), `gazeta_${page}.json`)
  
  // Check if image exists
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Error: Image not found at ${imagePath}`)
    throw new Error(`Image not found: gazeta_${page}.jpg`)
  }
  
  console.log(`📄 Processing page ${page}...`)
  
  // Process image to HTML
  const htmlContent = await parseImageToHTML(imagePath, page)
  
  // Create content file
  const contentFile = createContentFile(htmlContent, page)
  
  // Save output file
  await saveOutputFile(contentFile, outputPath)
  
  console.log(`🎉 Successfully converted gazeta_${page}.jpg to gazeta_${page}.json`)
}

async function processBatch(batch: string, concurrent: number = 2): Promise<void> {
  let pages: string[] = []
  
  if (batch === 'all') {
    // Find all available images
    const bucketPath = path.join(process.cwd(), 'public', 'bucket')
    const files = fs.readdirSync(bucketPath).filter(f => f.endsWith('.jpg') && f.startsWith('gazeta_'))
    pages = files.map(f => f.replace('gazeta_', '').replace('.jpg', '')).sort()
  } else if (batch.includes('-')) {
    // Range like "001-005"
    const [start, end] = batch.split('-')
    const startNum = parseInt(start)
    const endNum = parseInt(end)
    for (let i = startNum; i <= endNum; i++) {
      pages.push(i.toString().padStart(3, '0'))
    }
  } else {
    // Comma-separated list
    pages = batch.split(',').map(p => p.trim())
  }
  
  console.log(`🚀 Processing ${pages.length} pages with max ${concurrent} concurrent operations`)
  
  // Process in batches to avoid overwhelming the system
  for (let i = 0; i < pages.length; i += concurrent) {
    const batchPages = pages.slice(i, i + concurrent)
    console.log(`
📦 Processing batch: ${batchPages.join(', ')}`)
    
    const promises = batchPages.map(page => 
      processSinglePage(page).catch(error => {
        console.error(`❌ Failed to process page ${page}:`, error.message)
        return null
      })
    )
    
    await Promise.all(promises)
  }
}

async function main() {
  try {
    const { page, batch, concurrent } = parseArgs()
    
    if (batch) {
      await processBatch(batch, concurrent)
      console.log(`🎉 Batch processing completed!`)
    } else {
      await processSinglePage(page)
    }
    
  } catch (error) {
    console.error('❌ Parse failed:', error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

// Run the parser
main()