import { RecipeSchema } from "@/src/recipeSchema";
import OpenAI from "openai/index.mjs";
import { zodResponseFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";

const modelName = "gpt-4o-2024-08-06";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const client = new OpenAI();
  const response = await client.chat.completions.create({
    model: modelName,
    messages: [
      { role: "user", content: `Recipe for ${prompt || "chocolate brownies"}` },
    ],
    response_format: zodResponseFormat(RecipeSchema, "recipeaSchema"),
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || "";
        controller.enqueue(new TextEncoder().encode(content));
      }
      controller.close();
    },
  });
  
  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  });
}
