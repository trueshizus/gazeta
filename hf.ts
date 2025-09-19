import ollama from 'ollama'

const file = Bun.file('./public/bucket/gazeta_017.jpg');
const buffer = Buffer.from(await file.arrayBuffer())


// import { parseArgs } from "util";

// const { values } = parseArgs({
//   args: Bun.argv,
//   options: {
//     s: {
//       type: 'string',
//     },
//   },
//   strict: true,
//   allowPositionals: true,
// });

// const content = values.s || 'Hello, world!';

const content = 'What is this image?'

const response = await ollama.chat({
  model: 'qwen2.5vl',
  messages: [{ role: 'user', content, images: ['./public/bucket/gazeta_017.jpg'] }],
})

console.log(response)