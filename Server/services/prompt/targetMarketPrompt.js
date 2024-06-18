export const getTargetMarketPrompt = (targetMarket) => {
    const targetPrompt = `The audience for the resulting text is ${targetMarket}. Tailor the translation to attract the ${targetMarket}.`;
    return targetPrompt;
   }