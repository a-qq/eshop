import { useCart } from "../components/cart/CartContext";
import CartProduct, { CartItem } from "../components/cart/CartProduct";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const calcPrice = (total: number, item: CartItem) =>
  total + item.quantity * item.price;

const Cart = () => {
  const { items, isLoading, total } = useCart();
  const isEmpty = items.length < 1;
  const subTotal = total;
  return (
    <div className="grid lg:grid-cols-12 pt-4 gap-20 mx-auto max-w-7xl px-6 w-full">
      <div className="lg:col-span-7">
        {isLoading || isEmpty ? (
          <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
            <span className="border border-dashed border-white flex items-center justify-center w-16 h-16 bg-gray-800 p-12 rounded-lg text-white">
              <ShoppingBagIcon
                className="absolute h-6 w-6"
                stroke="currentColor"
                fill="none"
              />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              Your cart is empty
            </h2>
            <p className="text-secondary px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        ) : (
          <div className="lg:px-0 sm:px-6 flex-1">
            <h1 className="pt-1 pb-4 text-2xl leading-7 font-bold tracking-wide">
              My Cart
            </h1>
            <h2 className="pt-1 pb-2 text-2xl font-bold tracking-wide cursor-pointer mb-2">
              Review your Order
            </h2>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-700 border-b border-gray-700 bg-gray-50 px-4 last:border-0 rounded-md shadow-md">
              {items.map((item) => (
                <CartProduct key={item.id} item={item} />
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="lg:col-span-5">
        <div className="flex-shrink-0 px-4 py-24 sm:px-6 ">
          <div className="bg-gray-50 px-4 pt-2 shadow-md">
            <ul className="py-3 border-t border-gray-700">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal} $</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Estimated Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-gray-700 py-3 font-bold pb-10">
              <span>Total</span>
              <span>{total} $</span>
            </div>
          </div>
          <div className="flex flex-row justify-end bg-gray-50 rounded-b-sm pb-4 px-4 shadow-md">
            <div className="w-full lg:w-72">
              {isEmpty ? (
                <Link href="/products/ISR/1">
                  <a className="min-w-full bg-indigo-700 text-gray-300 cursor-pointer inline-flex px-10 py-5 leading-6 transition ease-in-out duration-150 shadow-sm text-center justify-center uppercase border border-transparent items-center text-sm font-semibold tracking-wide hover:border-indigo-700 hover:bg-indigo-600 hover:text-white">
                    Continue Shopping
                  </a>
                </Link>
              ) : (
                <Link href="/checkout">
                  <a className="min-w-full bg-indigo-700 text-gray-300 cursor-pointer inline-flex px-10 py-5 leading-6 transition ease-in-out duration-150 shadow-sm text-center justify-center uppercase border border-transparent items-center text-sm font-semibold tracking-wide hover:border-indigo-700 hover:bg-indigo-600  hover:text-white">
                    Proceed to Checkout
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
