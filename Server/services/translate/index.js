import { OpenAI } from "openai";
import dotenv from "dotenv";
import { constructPrompt } from "../prompt/index.js";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const translateText = async (input) => {
  const prompt = constructPrompt(input);
  const completion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    response_format: { "type":"json_object" },
    messages: prompt,
    temperature: 0.1,
    max_tokens: 3500,
    top_p: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
  
  });
  return completion;
};

