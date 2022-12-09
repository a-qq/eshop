import { useEffect, useState } from "react";
import { getCartFromLocalStorage } from "../../apis/getCart";
import { setCartItemsInLocalStorage } from "../../apis/setCart";
import { CartItem } from "./CartProduct";

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

  const removeItem = async (id: CartItem["id"]) => {
    setItems((prevState = []) =>
      prevState.filter((existingItem) => existingItem.id !== id)
    );
  };

  const upsertItem = async (item: CartItem) => {
    let needsFiltering = item.quantity < 1;
    let exists = false;

    setItems((prevSate = []) => {
      const existingItem = prevSate.find(
        (existingItem) => existingItem.id === item.id
      );

      if (!existingItem) {
        return [...prevSate, item];
      }

      let items = prevSate.map((existingItem) => {
        needsFiltering = needsFiltering || existingItem.quantity < 1;
        if (existingItem.id === item.id) {
          exists = true;
          return { ...existingItem, quantity: item.quantity };
        }
        return existingItem;
      });

      if (needsFiltering) {
        items = items.filter((item) => item.quantity > 0);
      }
      return items;
    });
  };

  return { items, error, isLoading, removeItem, upsertItem } as const;
};
