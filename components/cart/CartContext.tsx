import { createContext, ReactNode, useContext } from "react";
import { CartItem } from "./CartProduct";
import { useCart as useCartItems } from "./use-cart";

interface CartState {
  readonly items: readonly CartItem[];
  readonly error: string | null;
  readonly isLoading: boolean;
  readonly addItem: (item: CartItem) => Promise<void>;
  readonly updateItem: (item: CartItem) => Promise<void>;
  readonly removeItem: (id: CartItem["id"]) => Promise<void>;
  readonly count: number;
  readonly total: number;
}

export const CartContext = createContext<CartState | null>(null);

const countItem = (count: number, item: CartItem) => count + item.quantity;
const calcPrice = (total: number, item: CartItem) =>
  total + item.quantity * (item.price ?? 0);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { items, error, isLoading, removeItem, upsertItem } = useCartItems();

  return (
    <CartContext.Provider
      value={{
        items: items || [],
        error: error,
        isLoading: isLoading,
        addItem: async (item) => upsertItem(item),
        updateItem: async (item) => upsertItem(item),
        removeItem: async (id) => removeItem(id),
        count: items?.reduce(countItem, 0) ?? 0,
        total: items?.reduce(calcPrice, 0) ?? 0,
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
