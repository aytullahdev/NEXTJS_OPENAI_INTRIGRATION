import { z } from "zod";

export const RecipeSchema = z.object({
  name: z.string().describe("Name of the recipe"),
  ingredients: z
    .array(
      z.object({
        quantity: z.string().describe("Quantity of the ingredient"),
        ingredient: z.string().describe("Name of the ingredient"),
      })
    )
    .describe("Ingredients required for the recipe"),
  steps: z
    .array(z.string().describe("markdown content to describe the recipe steps"))
    .describe("Steps to prepare the recipe"),
});
