const TEXT_TYPE = {
    "COLLOQUIAL": "The input text is colloquial and therefore might contain words, slang, jargon and phrases of a specific dialect. When translating, ensure to retain the meaning by expressing them appropriately in the output language.",
    "MARKETING": "Transform the BETTER text into compelling marketing content while staying within the input sentence's context.",
    "LEGAL": "The existing input text is a legal document, potentially featuring legal terms, jargon, and specific dialect phrases. Translate them into the output language while maintaining the legal context and language nuances.",
    "TECHNICAL" : "The existing input text is a technical document. Translate the entire text word for word into the output language, maintaining the meaning of specific constants and literals. Employ transliteration when needed.",
    "CONVERSATIONAL" : "The current input text is casual. Translate it in the output language exactly as it appears in the input, following the provided instructions. Retain the original meaning of the text."
}

export const getTextTypePrompt = (textType) => {
    return TEXT_TYPE[textType.toUpperCase()];
}