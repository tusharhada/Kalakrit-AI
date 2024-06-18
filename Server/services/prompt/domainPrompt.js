export const getDomainPrompt = (domain) => {
    const domainPrompt = `The input text belongs to ${domain}. Translate it accordingly for the ${domain}.`;
    return domainPrompt;
   }