import express from "express";
import { translateText } from "../services/translate/index.js";
import { tokenCount } from "../services/token/index.js";

const router = express.Router();

export const getTokenCount = async (req, res) => {
  const count = tokenCount(req.body);
  if (count) {
    res.status(200).json({ count: count });
  } else {
    res.status(403).json({ error: "Token Limit exceeded" });
  }
};

export const getTranslatedOutput = async (req, res) => {
  try {
    // Check if the Token Limit is exceeded.
    if (!tokenCount(req.body)) {
      res.status(403).json({ error: "Token Limit exceeded" });
      return;
    }

    // Return the translated text.
    const start = performance.now();
    const result = await translateText(req.body);
    const end = performance.now();

    // Logging time taken to process the request.
    result.time = (end - start) / 1000;
    console.log("Result: ", result);
    console.log("Result output text:", result.choices[0].message);
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export default router;
