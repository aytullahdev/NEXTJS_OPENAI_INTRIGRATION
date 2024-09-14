"use client";

import { Recipe, RecipeCardComponent } from "@/components/recipe-card";
import { Input } from "@/components/ui/input";
import { RecipeSchema } from "@/src/recipeSchema";
import { experimental_useObject as useObject } from "ai/react";
import React from "react";

export default function Page() {
  const [prompt, setPrompt] = React.useState("");
  const { object, submit, isLoading } = useObject({
    schema: RecipeSchema,
    api: "/vercel-ai/api",
    initialValue: {
      name: "",
      ingredients: [],
      steps: [],
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit({ prompt });
            setPrompt("");
          }
        }}
        placeholder="What recipe do you want"
      />
      <div>
        <RecipeCardComponent recipe={object as Recipe} />
      </div>
    </div>
  );
}
