import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const router = express.Router();

// FREE MODELS LIST
const MODELS = ["open-mistral-7b", "open-mistral-7b-instruct", "mistral-tiny"];

interface MistralChoice {
  message: { role: string; content: string };
}

interface MistralResponse {
  choices?: MistralChoice[];
}

router.post("/ask", async (req: Request, res: Response) => {
  const { question } = req.body;

  if (!question)
    return res.status(400).json({ message: "Please provide a question." });

  for (const model of MODELS) {
    try {
      console.log(`🌿 Trying model: ${model}`);

      const response = await fetch(process.env.MISTRAL_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                "You are a friendly plant expert assistant for Floral World. Give simple, helpful answers.",
            },
            {
              role: "user",
              content: question,
            },
          ],
        }),
      });

      const data = (await response.json()) as unknown as MistralResponse;

      // If API responded correctly
      if (data?.choices?.[0]?.message?.content) {
        return res.json({ answer: data.choices[0].message.content });
      }

      console.log(`⚠️ Model ${model} returned empty response, trying next...`);
    } catch (error) {
      console.log(`❌ Error with model ${model}:`, error);
    }
  }

  // If all models fail
  return res.json({
    answer:
      "🌸 Sorry! All AI servers are busy right now. Please try again shortly.",
  });
});

export default router;
