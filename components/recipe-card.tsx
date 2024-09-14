"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RecipeSchema } from "@/src/recipeSchema";
import Markdown from "react-markdown";
import { z } from "zod";

export function RecipeCardComponent({
  recipe,
}: {
  recipe: z.infer<typeof RecipeSchema>;
}) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{recipe?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recipe?.ingredients?.length ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {recipe?.ingredients?.map((item, index) => (
                  <li key={index}>
                    {item.quantity} {item.ingredient}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="animate-pulse bg-slate-200 h-2 w-40"></div>
          )}
          <Separator />
          {recipe?.steps?.length ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2">
                {recipe?.steps?.map((step, index) => (
                  <li key={index} className="pl-2">
                    <Markdown className="ml-2">{step}</Markdown>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="animate-pulse bg-slate-200 h-2 w-40"></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
