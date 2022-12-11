import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useCart } from "./CartContext";
import Quantity from "../Quantity";

export interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly quantity: number;
  readonly imageUrl: string;
}

const placeholderImg = "/product-img-placeholder.svg";

const CartProduct = ({ item, ...rest }: { item: CartItem }) => {
  const [removing, setRemoving] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const { updateItem, removeItem } = useCart();
  const price = quantity * item.price;

  const changeQuantity = async (n = 1) => {
    const val = Number(quantity) + n;
    setQuantity(val);
    await updateItem({ ...item, quantity: val });
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removeItem(item.id);
    } catch (error) {
      setRemoving(false);
    }
  };

  const handleChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value));
    await updateItem({ ...item, quantity: Number(value) });
  };

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity);
    }
    // TODO: currently not including quantity in deps is intended, but we should
    // do this differently as it could break easily
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity]);

  console.log(removing);
  return (
    <li
      className={`flex flex-col py-4 ${
        removing ? "opacity-50 pointer-events-none" : ""
      }`}
      {...rest}
    >
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer z-0">
          <Link href={`/productsISR/details/${item.id}`}>
            <a>
              <Image
                className="transform scale-150 min-w-full max-h-full left-1/3 top-1/3 z-1"
                width={150}
                height={150}
                src={item.imageUrl || placeholderImg}
                alt={item.title || "Product Image"}
                unoptimized
              />
            </a>
          </Link>
        </div>
        <div className="flex-1 flex flex-col text-base">
          <Link href={`/productsISR/details/${item.id}`}>
            <a>
              <span className="font-medium cursor-pointer pb-1 -mt-1">
                {item.title}
              </span>
            </a>
          </Link>
        </div>
        <div className="flex flex-col justify-between space-y-2 text-sm">
          <span>{price / 100} $</span>
        </div>
      </div>
      <Quantity
        value={quantity}
        handleRemove={handleRemove}
        handleChange={handleChange}
        increase={() => changeQuantity(1)}
        decrease={() => changeQuantity(-1)}
      />
    </li>
  );
};

export default CartProduct;
