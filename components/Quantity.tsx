import { ChangeEventHandler, MouseEventHandler } from "react";
import { MinusSmallIcon as Minus } from "@heroicons/react/24/solid";
import { PlusSmallIcon as Plus } from "@heroicons/react/24/solid";
import { XMarkIcon as Cross } from "@heroicons/react/24/solid";

export interface QuantityProps {
  value: number;
  increase: () => any;
  decrease: () => any;
  handleRemove: MouseEventHandler<HTMLButtonElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  max?: number;
}

const Quantity = ({
  value,
  increase,
  decrease,
  handleRemove,
  handleChange,
  max = 6,
}: QuantityProps) => {
  return (
    <div className="flex flex-row h-9">
      <button
        className="flex p-1 border-gray-700 border items-center justify-center
       w-12 text-gray-600 transition duration-150 select-none ease-in hover:bg-gray-700
     hover:border-gray-300 hover:text-white hover:transition-[border-color] hover:z-10
       focus:outline-none disabled:cursor-not-allowed"
        onClick={handleRemove}
      >
        <Cross className="h-5 w-5" />
      </button>
      <label className="w-full border-gray-700 border ml-2">
        <input
          className="bg-transparent px-4 w-full h-full focus:outline-none select-none pointer-events-auto"
          onChange={(e) =>
            Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
          }
          value={value}
          type="number"
          max={max}
          min="0"
          readOnly
        />
      </label>
      <button
        type="button"
        onClick={decrease}
        className="flex p-1 border-gray-700 border items-center justify-center
        w-12 text-gray-600 transition duration-150 select-none ease-in hover:bg-gray-700
      hover:border-gray-300 hover:text-white hover:transition-[border-color] hover:z-10
        focus:outline-none disabled:cursor-not-allowed -ml-[1px]"
        disabled={value <= 1}
      >
        <Minus className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={increase}
        className="flex p-1 border-gray-700 border items-center justify-center
        w-12 text-gray-600 transition duration-150 select-none ease-in hover:bg-gray-700
      hover:border-gray-300 hover:text-white hover:transition-[border-color] hover:z-10
        focus:outline-none disabled:cursor-not-allowed -ml-[1px]"
        disabled={value < 1 || value >= max}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Quantity;
