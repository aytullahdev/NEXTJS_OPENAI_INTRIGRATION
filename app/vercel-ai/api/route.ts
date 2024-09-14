import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { RecipeSchema } from "@/src/recipeSchema";
import { NextResponse } from "next/server";

const modelName = "gpt-4o-2024-08-06";
export async function POST(req: Request) {
  const { prompt } = await req.json();
  const { object } = await generateObject({
    model: openai(modelName),
    schema: RecipeSchema,
    prompt: `Recipe for ${prompt || "chocolate brownies"}`,
    apiKey: process.env.OPENAI_API_KEY,
  });

  return NextResponse.json(object);
}
