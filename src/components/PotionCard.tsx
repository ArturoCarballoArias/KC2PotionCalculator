interface PotionIngredient {
  name: string;
  required: number;
}

interface PotionCardProps {
  name: string;
  image: string;
  count: number;
  ingredients: PotionIngredient[];
}

function PotionCard({ name, image, count, ingredients }: PotionCardProps) {
  return (
    <div className="bg-gray-300 text-black rounded-lg shadow p-4 flex flex-col items-center w-60">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold mb-2 w-full truncate text-center">
        {name}
      </h3>
      <div className="w-full">
        <p className="font-medium">Recipe:</p>
        <ul className="text-sm list-disc pl-5">
          {ingredients.map((ing) => (
            <li key={ing.name}>
              {ing.required} x {ing.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold">x {count}</p>
      </div>
    </div>
  );
}

export default PotionCard;
