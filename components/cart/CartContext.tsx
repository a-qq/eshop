import { createContext, ReactNode, useContext } from "react";
import { CartItem } from "./CartItem";
import { useCart as useCartItems } from "./use-cart";

interface CartState {
  readonly items: readonly CartItem[];
  readonly error: string | null;
  readonly isLoading: boolean;
  readonly addItem: (item: CartItem) => void;
  readonly removeItem: (id: CartItem["id"]) => void;
  readonly count: () => number;
}

export const CartContext = createContext<CartState | null>(null);

const countItem = (count: number, item: CartItem) => count + item.quantity;

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [items, error, isLoading, addItem, removeItem] = useCartItems();

  return (
    <CartContext.Provider
      value={{
        items: items || [],
        error: error,
        isLoading: isLoading,
        addItem: async (item) => addItem(item),
        removeItem: async (id) => removeItem(id),
        count: () => items?.reduce(countItem, 0) ?? 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("CartContextProvider not implemented!");
  }

  return cart;
};
