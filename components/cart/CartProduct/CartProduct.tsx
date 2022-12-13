import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import s from "./CartProduct.module.css";
import Quantity from "../../Quantity";
import { useCart } from "../CartContext";

export type CartItem = {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly quantity: number;
  readonly imageUrl: string;
};

const placeholderImg = "/product-img-placeholder.svg";

const CartProduct = ({
  item,
  variant = "default",
  ...rest
}: {
  variant?: "default" | "display";
  item: CartItem;
}) => {
  const [removing, setRemoving] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const { updateItem, removeItem } = useCart();
  const price = item.price;

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

  return (
    <li
      className={`flex flex-col py-4 ${
        removing ? "opacity-50 pointer-events-none" : ""
      }`}
      {...rest}
    >
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-16 h-16 relative overflow-hidden cursor-pointer z-0">
          <Link href={`/productsISR/details/${item.id}`}>
            <a>
              <Image
                className={s.productImage}
                width={150}
                height={150}
                src={item.imageUrl || placeholderImg}
                alt={item.title || "Product Image"}
                layout="responsive"
                unoptimized
              />
            </a>
          </Link>
        </div>
        <div className="flex-1 flex flex-col text-gray-900 lg:text-sm">
          <Link href={`/products/details/${item.id}`}>
            <a>
              <span className="font-medium cursor-pointer pb-1 -mt-1">
                {item.title}
              </span>
            </a>
          </Link>
        </div>
        {variant === "display" && (
          <div className="text-sm tracking-wider font-medium">{quantity}x</div>
        )}
        <div className="flex flex-col justify-between space-y-2 text-sm font-medium">
          <span>{price / 100} $</span>
        </div>
      </div>
      {variant === "default" && (
        <Quantity
          value={quantity}
          handleRemove={handleRemove}
          handleChange={handleChange}
          increase={() => changeQuantity(1)}
          decrease={() => changeQuantity(-1)}
        />
      )}
    </li>
  );
};

export default CartProduct;
