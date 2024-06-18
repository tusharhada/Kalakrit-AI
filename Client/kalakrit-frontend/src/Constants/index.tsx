import { Language } from "./language";

const TokenLimit = 1000;

const Options = {
  Tone: ["Casual", "Soft", "Formal"],
  TextType: ["Conversational", "Colloquial", "Legal", "Technical"],
  Domain: [
    "Medicare",
    "Multimedia",
    "E-Commerce",
    "BSFI",
    "Ed-Tech",
    "Logistics",
    "Government",
    "Market Research",
    "Tourism",
    "Publications",
    "Commercials",
    "IT",
    "Advertising",
    "Entertainment",
    "NGO",
  ],
  Region: [
    "Bangalore",
    "Jaipur",
    "Mumbai",
    "Delhi",
    "Pune",
    "Agra",
    "Gurugram",
    "Noida",
  ],
};

export type OptionsType = keyof typeof Options;

const Constant = {
  Options,
  Language,
  TokenLimit,
};

export default Constant;
