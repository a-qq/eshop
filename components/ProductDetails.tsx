import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { MarkdownStatic } from "./MarkdownStatic";
import { useCart } from "./cart/CartContext";
import { MarkdownStaticResult, Product } from "../types";
import { calcAverageRating } from "../utils";

interface ProductDetailsProps {
  product: Product & { longDescription: MarkdownStaticResult };
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const cart = useCart();
  const rating = calcAverageRating(product.reviews);
  return (
    <>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          title: product.name,
          description: product.description,
          images: product.images.map((i) => ({
            url: i.url,
            alt: product.name,
            height: i.height ?? 1,
            width: i.width ?? 1,
            type: i.mimeType ?? "image/jpeg",
          })),
        }}
      />
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 bg-white shadow-xl rounded-2xl border-1 py-4">
          <Image
            alt={product.name}
            src={
              product.images.length > 0
                ? product.images[0].url
                : "placeholder-product-details.svg"
            }
            layout="responsive"
            width={product.images[0]?.width ?? 1}
            height={product.images[0]?.height ?? 1}
            className="w-full rounded-xl object-contain"
          />

          <div className="grid grid-cols-2 gap-4 lg:mt-4">
            {product.images.length > 1
              ? product.images.slice(1).map((i) => {
                  return (
                    <Image
                      key={i.id}
                      alt={product.name}
                      src={i.url}
                      layout="responsive"
                      width={i.width ?? 1}
                      height={i.height ?? 1}
                      className="aspect-square w-full rounded-xl object-contain"
                    />
                  );
                })
              : Array(4)
                  .fill(1)
                  .map((_, i) => {
                    return (
                      <Image
                        key={i}
                        alt={product.name + i}
                        src={product.images[0].url}
                        layout="responsive"
                        width={product.images[0].width ?? 1}
                        height={product.images[0].height ?? 1}
                        className="aspect-square w-full rounded-xl object-contain"
                      />
                    );
                  })}
          </div>
        </div>

        <div className="sticky top-3">
          {product.collections.length > 0 && (
            <span className="inline-block bg-indigo-200 text-indigo-800 px-2 rounded-full ">
              {product.collections[0].name}
            </span>
          )}

          <div className="mt-8 flex justify-between">
            <div className="max-w-[35ch]">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              {product.categories.length > 0 && (
                <p className="mt-0.5 text-sm">{product.categories[0].name}</p>
              )}

              {rating && (
                <div className="mt-2 -ml-0.5 flex">
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
              )}
            </div>

            <p className="text-lg font-bold">${product.price / 100}</p>
          </div>

          <details className="group relative mt-4">
            <summary className="block">
              <div>
                <div className="prose max-w-none group-open:hidden">
                  <p>{product.description}</p>
                </div>

                <span className="mt-4 cursor-pointer text-sm font-medium underline group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0">
                  Read More
                </span>
              </div>
            </summary>

            <div className="prose max-w-none pb-6 text-justify">
              <p>{product.description}</p>
              <article className="prose lg:prose-xl">
                <MarkdownStatic>{product.longDescription}</MarkdownStatic>
              </article>
            </div>
          </details>

          <form className="mt-8">
            <div className="mt-8 flex">
              <div>
                <label htmlFor="quantity" className="sr-only">
                  Qty
                </label>

                <input
                  type="number"
                  id="quantity"
                  min="1"
                  defaultValue="1"
                  disabled //untill switch to graphql e-commerce demo
                  className="w-12 rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <button
                type="submit"
                className="ml-3 block rounded bg-green-600 px-5 py-2 font-semibold text-gray-100 hover:bg-green-500"
                onClick={() =>
                  cart.addItem({
                    id: product.id,
                    price: product.price,
                    title: product.name,
                    quantity: 1,
                    imageUrl: product.images[0]?.url ?? "",
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
