import ollama from 'ollama'
import fs from 'fs'
import path from 'path'

interface ParseOptions {
  page: string
}

function parseArgs(): ParseOptions {
  const args = process.argv.slice(2)
  const pageArg = args.find(arg => arg.startsWith('--page='))
  
  if (!pageArg) {
    console.error('❌ Error: --page parameter is required')
    console.log('Usage: bun parse --page="006"')
    process.exit(1)
  }
  
  const page = pageArg.split('=')[1].replace(/['"]/g, '')
  return { page }
}

async function readImageAsBase64(imagePath: string): Promise<string> {
  try {
    const imageBuffer = fs.readFileSync(imagePath)
    const base64Image = imageBuffer.toString('base64')
    return base64Image // Return just the base64 string, not data URL
  } catch (error) {
    throw new Error(`Failed to read image: ${imagePath}`)
  }
}

async function parseImageToHTML(imagePath: string, pageNumber: string): Promise<string> {
  try {
    console.log('🖼️  Reading image:', imagePath)
    const base64Image = await readImageAsBase64(imagePath)
    
    console.log('🤖 Processing with Qwen2.5-VL...')
    console.log('⏳ This may take a few minutes for complex documents...')
    
    const prompt = `Extract all text from this document image and convert it to clean HTML.

Instructions:
- Extract ALL visible text accurately
- Use semantic HTML tags: <h1>, <h2>, <p>, <ul>, <li>, <table>, etc.
- Preserve the document structure and layout
- Do NOT include <html>, <head>, or <body> tags
- Do NOT wrap output in markdown code blocks
- Return ONLY the HTML content
- If you see repeated text, list each unique item only once

Return the HTML directly without any markdown formatting.`

    const response = await ollama.chat({
      model: 'qwen2.5vl',
      messages: [{
        role: 'user',
        content: prompt,
        images: [base64Image]
      }],
      options: {
        temperature: 0.1,
        num_predict: 2000
      }
    })

    return response.message.content
    
  } catch (error) {
    console.error('❌ Error processing image:', error)
    throw error
  }
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

async function main() {
  try {
    const { page } = parseArgs()
    
    // Construct file paths
    const imagePath = path.join(process.cwd(), 'public', 'bucket', `gazeta_${page}.jpg`)
    const outputPath = path.join(process.cwd(), `gazeta_${page}.json`)
    
    // Check if image exists
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ Error: Image not found at ${imagePath}`)
      process.exit(1)
    }
    
    console.log(`📄 Processing page ${page}...`)
    
    // Process image to HTML
    const htmlContent = await parseImageToHTML(imagePath, page)
    
    // Create content file
    const contentFile = createContentFile(htmlContent, page)
    
    // Save output file
    await saveOutputFile(contentFile, outputPath)
    
    console.log(`🎉 Successfully converted gazeta_${page}.jpg to gazeta_${page}.json`)
    
  } catch (error) {
    console.error('❌ Parse failed:', error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

// Run the parser
main()
