import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "./CartContext";

const CartIcon = ({ className = "" }) => {
  const cart = useCart();
  const itemsCount = cart.count();

  return (
    <Link href="/cart">
      <div
        className={`text-gray-400 hover:text-white relative flex items-center cursor-pointer ${className}`}
      >
        <span className="sr-only">Cart items: {itemsCount}</span>
        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
        {itemsCount > 0 && (
          <span className="border border-gray-700 bg-white text-black absolute rounded-full right-3 top-3 flex items-center justify-center font-bold text-xs px-[2.5px] h-4 w-4">
            {itemsCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
