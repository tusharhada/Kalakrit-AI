import {
    encode,
    encodeChat,
    decode,
    encodeGenerator,
    decodeGenerator  } from 'gpt-tokenizer';  
import { isWithinTokenLimit } from 'gpt-tokenizer/model/gpt-4-0314';
import { constructPrompt } from '../prompt/index.js';

  const text = 'Hello, world!'
  const tokenLimit = 1500;
  
  const model ="gpt-3.5-turbo";

  // Encode text into tokens
  // const tokens = encode(text)
  
  // // Decode tokens back into text
  // const decodedText = decode(tokens)

  // console.log("Tokens: ", tokens);
  // console.log("Decoded Text: ", decodedText);

  // // Check if text is within the token limit
  // // returns false if the limit is exceeded, otherwise returns the actual number of tokens (truthy value)
  // const withinTokenLimit = isWithinTokenLimit(text, tokenLimit)
  // console.log(withinTokenLimit);

  // // Example chat:
  // const chat = [
  //   { role: 'system', content: 'You are a helpful assistant.' },
  //   { role: 'assistant', content: 'gpt-tokenizer is awesome.' },
  // ]
  
  // // Encode chat into tokens
  // const chatTokens = encodeChat(chat, model);
  // console.log("Chat Tokens:", chatTokens);
  
  // // Check if chat is within the token limit
  // const chatWithinTokenLimit = isWithinTokenLimit(chat, tokenLimit);
  // console.log("Chat Token Limit:", chatWithinTokenLimit);

export const tokenCount = (input) => {
  const prompt = constructPrompt(input);
  const tokenCount = isWithinTokenLimit(prompt, tokenLimit);
  console.log("Input Text Token Count: ", isWithinTokenLimit(input.data, 500));
  console.log("Token Count: ", tokenCount);
  return tokenCount;
}

// export const isWithinLimit = (prompt, tokenLimit) => {
//   prompt = constructPrompt(input);
//  return isWithinTokenLimit(prompt, tokenLimit);
// };
