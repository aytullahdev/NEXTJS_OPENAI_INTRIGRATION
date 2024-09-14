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
  });

  return NextResponse.json(
    JSON.parse(response.choices[0].message.content || "")
  );
}
