import ollama from 'ollama'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

async function chatWithOllama(question?: string): Promise<void> {
  try {
    const userQuestion = question || 'Why is the sky blue?'
    const message: Message = { role: 'user', content: userQuestion }
    
    console.log('🤖 Asking Ollama:', message.content)
    console.log('📝 Response:\n')
    
    const response = await ollama.chat({
      model: 'qwen2.5vl',
      messages: [message],
      stream: true,
    })
    
    for await (const part of response) {
      if (part.message?.content) {
        process.stdout.write(part.message.content)
      }
    }
    
    console.log('\n\n✅ Chat completed!')
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error')
  }
}

// Get question from command line arguments or use default
const args = process.argv.slice(2)
const question = args.length > 0 ? args.join(' ') : undefined

// Run the chat
chatWithOllama(question)
