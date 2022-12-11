import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Collection, Image as ProductImage, Product, Review } from "../types";
import { calcAverageRating } from "../utils";

export type ProductListItem = Pick<
  Product,
  "id" | "name" | "price" | "categories"
> & {
  imageUrl?: string;
  reviews: Array<Pick<Review, "id" | "rating">>;
  collections: Array<Pick<Collection, "id" | "name">>;
  href: string;
};

export const ProductCard = ({
  id,
  name,
  price,
  categories,
  imageUrl,
  reviews,
  collections,
  href,
}: ProductListItem) => {
  const showCollectionPin = collections.length > 0;
  const showCategory = categories.length > 0;
  const rating = calcAverageRating(reviews);
  return (
    <Link href={href}>
      <a>
        <div className="bg-white border rounded-lg overflow-hidden shadow-xl p-6">
          <div className="relative h-80 aspect-square w-full group-hover:opacity-75 sm:aspect-none sm:h-96">
            <Image
              className="h-full w-full object-contain object-center"
              src={imageUrl ?? "/placeholder-product-card.svg"}
              alt={name}
              layout="fill"
            />
          </div>
          <div className="mt-6">
            <div className="flex items-baseline text-xs uppercase font-semibold tracking-wide">
              {showCollectionPin && (
                <span className="inline-block bg-indigo-200 text-indigo-800 px-2 rounded-full ">
                  {collections[0].name}
                </span>
              )}
              {showCategory && (
                <div
                  className={`${
                    showCollectionPin ? "ml-2" : null
                  } text-gray-600`}
                >
                  {categories[0].name}
                </div>
              )}
            </div>
            <h4 className="mt-1 font-semibold text-lg leading-tight truncate">
              {name}
            </h4>
            <div className="mt-2">${price / 100}</div>
            {rating && (
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
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};
