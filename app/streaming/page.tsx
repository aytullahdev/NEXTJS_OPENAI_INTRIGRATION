"use client";

import { RecipeCardComponent } from "@/components/recipe-card";
import { Input } from "@/components/ui/input";
import { RecipeSchema } from "@/src/recipeSchema";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { parse } from "partial-json";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [recipe, setRecipe] = useState<z.infer<typeof RecipeSchema>>({
    name: "",
    ingredients: [],
    steps: [],
  });

  async function handleSubmit() {
    setPrompt("");
    setIsLoading(true);
    setRecipe({
      name: "",
      ingredients: [],
      steps: [],
    });

    const res = await fetch("/streaming/api", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const reader = res.body?.getReader();

    if (!reader) {
      return {};
    }
    setIsLoading(false);
    const decoder = new TextDecoder();
    let data = "";
    let parsed = {};
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      data += decoder.decode(value);
      parsed = parse(data);

      setRecipe(parsed as z.infer<typeof RecipeSchema>);
    }
  }

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
            handleSubmit();
          }
        }}
        placeholder="What recipe do you want"
      />
      <div>
        {isLoading ? (
          <Loader className="size-6  animate-spin" />
        ) : (
          <RecipeCardComponent recipe={recipe} />
        )}
      </div>
    </div>
  );
}