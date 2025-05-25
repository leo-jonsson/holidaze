"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function generateVenueContent(url: string) {
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `You're a professional copywriter and you want to help a customer list a venue. Based on this image, write a description (Max 200 words) that provides details about the venue they plan on listing. Don't make up a name for the venue, no title needed.`,
          },
          {
            type: "image",
            image: new URL(url),
          },
        ],
      },
    ],
  });

  return text;
}
