interface IngredientCardProps {
  name: string;
  image: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

function IngredientCard({
  name,
  image,
  count,
  onIncrement,
  onDecrement,
}: IngredientCardProps) {
  return (
    <div className="bg-white text-black rounded-lg shadow p-4 flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-semibold mb-2 w-full truncate text-center">
        {name}
      </h3>
      <div className="flex items-center">
        <button
          onClick={onDecrement}
          className="px-3 py-1 bg-red-500 text-white rounded-l hover:bg-red-600 focus:outline-none"
        >
          -
        </button>
        <span className="w-12 text-center py-1 border-t border-b border-gray-300">
          {count}
        </span>
        <button
          onClick={onIncrement}
          className="px-3 py-1 bg-green-500 text-white rounded-r hover:bg-green-600 focus:outline-none"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default IngredientCard;
