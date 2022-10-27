import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { ProductDetails } from "./ProductDetails";
import Image from "next/image"

type ProductCardProps = Pick<
  ProductDetails,
 "title" | "price" | "category" | "imageUrl" | "imageAlt" | "rating"
> & {href: string};

export const ProductCard = ({
  title,
  price,
  category,
  imageUrl,
  imageAlt,
  rating,
  href
}: ProductCardProps) => {
  const isBestSeller = rating.count >= 500 && rating.rate >= 3.0;
  return (
    <Link href={href}>
      <a>
        <div className="bg-white border rounded-lg overflow-hidden shadow-xl p-6">
          <div className="relative h-80 aspect-w-1 aspect-h-1 w-full group-hover:opacity-75 sm:aspect-none sm:h-96">
            <Image
              className="h-full w-full object-contain object-center"
              src={imageUrl}
              alt={imageAlt}
              layout="fill"
            />
          </div>
          <div className="mt-6">
            <div className="flex items-baseline text-xs uppercase font-semibold tracking-wide">
              {isBestSeller ? (
                <span className="inline-block bg-indigo-200 text-indigo-800 px-2 rounded-full ">
                  Bestseller
                </span>
              ) : null}
              <div className={`${isBestSeller ? "ml-2" : null} text-gray-600`}>
                {category}
              </div>
            </div>
            <h4 className="mt-1 font-semibold text-lg leading-tight truncate">
              {title}
            </h4>
            <div className="mt-2">${price}</div>
            <div className="mt-2 flex items-center">
              {Array(5)
                .fill(1)
                .map((el, i) => {
                  return (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i + el <= Math.round(rating.rate)
                          ? "text-indigo-500"
                          : " text-gray-400"
                      }`}
                    />
                  );
                })}
              <span className="ml-2 text-gray-600 text-sm">
                {rating.count} reviews
              </span>
            </div>
        </div>
        </div>
      </a>
    </Link>
  );
};
