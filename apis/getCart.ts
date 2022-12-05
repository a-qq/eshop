import { CartItem } from "../components/cart/CartItem";
import { CartKey } from "../utils";

export const getCartFromLocalStorage = async () => {
  const CART_KEY = CartKey();

  const itemsAsJson = localStorage.getItem(CART_KEY);
  if (!itemsAsJson) return new Array<CartItem>();
  try {
    const items: CartItem[] = JSON.parse(itemsAsJson);
    return items;
  } catch (err) {
    console.error(err);
    return new Array<CartItem>();
  }
};
