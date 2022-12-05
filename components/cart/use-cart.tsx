import { useEffect, useState } from "react";
import { getCartFromLocalStorage } from "../../apis/getCart";
import { setCartItemsInLocalStorage } from "../../apis/setCart";
import { CartItem } from "./CartItem";

export const useCart = () => {
  const [items, setItems] = useState<CartItem[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getCartFromLocalStorage();
        if (isMounted) {
          setItems(response);
          setError(null);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
          setItems(undefined);
        }
      }
    };

    fetchData();
    const cleanUp = () => {
      isMounted = false;
    };
    return cleanUp;
  }, []);

  useEffect(() => {
    if (items === undefined) {
      return;
    }
    setCartItemsInLocalStorage(items);
  }, [items]);

  const addItem = async (item: CartItem) => {
    setItems((prevSate = []) => {
      const existingItem = prevSate.find(
        (existingItem) => existingItem.id === item.id
      );
      if (!existingItem) {
        return [...prevSate, item];
      }

      return prevSate.map((existingItem) => {
        return existingItem.id === item.id
          ? { ...existingItem, quantity: existingItem.quantity + 1 }
          : existingItem;
      });
    });
  };

  const removeItem = async (id: CartItem["id"]) => {
    setItems((prevState = []) => {
      const existingItem = prevState.find(
        (existingItem) => existingItem.id === id
      );
      if (existingItem && existingItem.quantity <= 1) {
        return prevState.filter((existingItem) => existingItem.id !== id);
      }
      return prevState.map((existingItem) => {
        return existingItem.id === id
          ? { ...existingItem, quantity: existingItem.quantity - 1 }
          : existingItem;
      });
    });
  };

  return [items, error, isLoading, addItem, removeItem] as const;
};
