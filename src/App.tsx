// App.tsx

import { useState } from "react";
import IngredientCard from "./components/IngredientCard";
import PotionCard from "./components/PotionCard";
import ingredientsData from "./data/ingredients.json";
import potionsData from "./data/potions.json";

interface Ingredient {
  name: string;
  image: string;
  initialCount: number;
}

interface PotionIngredient {
  name: string;
  required: number;
}

interface PotionRecipe {
  name: string;
  image: string;
  ingredients: PotionIngredient[];
}

/**
 * Given the required ingredients and available counts,
 * returns how many full potions can be made.
 */
function calculatePotionCount(
  requiredIngredients: PotionIngredient[],
  available: Record<string, number>
): number {
  const counts = requiredIngredients.map(({ name, required }) => {
    const availableCount = available[name] || 0;
    return Math.floor(availableCount / required);
  });
  return Math.min(...counts);
}

function App() {
  // State for available ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    ingredientsData as Ingredient[]
  );

  // Handlers to increase or decrease counts.
  const incrementCount = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index
          ? { ...ingredient, initialCount: ingredient.initialCount + 1 }
          : ingredient
      )
    );
  };

  const decrementCount = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index
          ? {
              ...ingredient,
              initialCount: Math.max(0, ingredient.initialCount - 1),
            }
          : ingredient
      )
    );
  };

  // New handler for direct input changes.
  const updateCount = (index: number, newCount: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index ? { ...ingredient, initialCount: newCount } : ingredient
      )
    );
  };

  // Create a lookup object for available ingredient counts
  const availableIngredients: Record<string, number> = ingredients.reduce(
    (acc, ingredient) => {
      acc[ingredient.name] = ingredient.initialCount;
      return acc;
    },
    {} as Record<string, number>
  );

  // Define your potion recipes.
  const [potions] = useState<PotionRecipe[]>(
    potionsData as PotionRecipe[]
  );

  // Filter only the potions that can be made at least once.
  const availablePotions = potions.filter((potion) => {
    const count = calculatePotionCount(potion.ingredients, availableIngredients);
    return count > 0;
  });

  return (
    <div className="min-h-screen min-w-screen bg-gray-400 p-4">
      <h1 className="text-6xl font-bold text-center text-black mb-4"> KC2 Potions Calculator</h1>
      <h1 className="text-3xl font-bold text-center text-black mb-4">Ingredients</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ingredient.name}
            name={ingredient.name}
            image={ingredient.image}
            count={ingredient.initialCount}
            onIncrement={() => incrementCount(index)}
            onDecrement={() => decrementCount(index)}
            onChange={(newCount) => updateCount(index, newCount)}
          />
        ))}
      </div>

      <h1 className="text-3xl text-black font-bold text-center mb-4">Potions</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {availablePotions.length > 0 ? (
          availablePotions.map((potion) => {
            const count = calculatePotionCount(potion.ingredients, availableIngredients);
            return (
              <PotionCard
                key={potion.name}
                name={potion.name}
                image={potion.image}
                count={count}
                ingredients={potion.ingredients}
              />
            );
          })
        ) : (
          <p className="text-xl text-black text-center">No potions available</p>
        )}
      </div>
    </div>
  );
}

export default App;
