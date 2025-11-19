import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const router = express.Router();

// Define a response type for Mistral
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

  try {
    const response = await fetch(process.env.MISTRAL_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly plant expert assistant for Floral World. Provide short, easy-to-understand answers.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    // Explicitly type the response
    const data: MistralResponse = (await response.json()) as MistralResponse;

    console.log("🌿 Mistral raw response:", JSON.stringify(data, null, 2));

    const answer =
      data.choices?.[0]?.message?.content ||
      "🌸 Sorry, I couldn’t find that answer.";

    res.json({ answer });
  } catch (error) {
    console.error("Mistral Error:", error);
    res.status(500).json({ message: "AI request failed. Try again later." });
  }
});

export default router;
