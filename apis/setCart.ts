import { CartItem } from "../components/cart/CartItem";
import { CartKey } from "../utils";

export const setCartItemsInLocalStorage = (cartItems: CartItem[]) => {
  const CART_KEY = CartKey();

  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
};
