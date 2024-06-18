import { encode, isWithinTokenLimit } from "gpt-tokenizer";

export const calculateToken = (text: string) => {
  const tokens = encode(text);
  return tokens;
};

export const checkTokenLimit = (text: string) => {
  const withinTokenLimit = isWithinTokenLimit(text, 100);
  return withinTokenLimit;
};
