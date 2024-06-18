const TONE = {
    "CASUAL": "Set the tone of the output to casual, so that the meaning of the text is preserved and converted directly in the output language. Also output the text as if you're talking to someone in a conversation.",
    "LITERAL": "Set the tone of the output to Formal, so that the meaning of the text is preserved and converted directly in the output language. Also output the text as if you're presenting in a formal fashion.",
    "FORMAL": "Set the tone of the output to Literal, so that the meaning of the text is preserved and converted directly in the output language.",
    "SOFT" : "Set the tone of the output to Soft, so that the meaning of the text is preserved and converted directly in the output language. Also the output is such that it feels on a lighter tone."
}

export const getTonePrompt = (tone) => {
    return TONE[tone.toUpperCase()];
}