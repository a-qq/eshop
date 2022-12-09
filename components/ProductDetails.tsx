import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ProductsLayout } from "./ProductsLayout";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";
import { MarkdownCsrProps } from "./MarkdownCsr";
import { MarkdownStaticProps } from "./MarkdownStatic";
import { useCart } from "./cart/CartContext";

export interface ProductDetails {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  rating: {
    rate: number;
    count: number;
  };
  longDescription:
    | ReactElement<MarkdownCsrProps>
    | ReactElement<MarkdownStaticProps>;
}

interface ProductDetailsProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductDetailsProps) => {
  const cart = useCart();
  const isBestSeller = data.rating.count >= 500 && data.rating.rate >= 3.0;
  return (
    <ProductsLayout>
      <NextSeo
        title={data.title}
        description={data.description}
        openGraph={{
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.imageUrl,
              alt: data.imageAlt,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 ">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 bg-white shadow-xl rounded-2xl border-1 py-4">
          <Image
            alt={data.imageAlt}
            src={data.imageUrl}
            layout="responsive"
            width={1}
            height={1}
            className="w-full rounded-xl object-contain"
          />

          <div className="grid grid-cols-2 gap-4  lg:mt-4">
            <Image
              alt={data.imageAlt}
              src={data.imageUrl}
              layout="responsive"
              width={1}
              height={1}
              className="aspect-square w-full rounded-xl object-contain"
            />

            <Image
              alt={data.imageAlt}
              src={data.imageUrl}
              layout="responsive"
              width={1}
              height={1}
              className="aspect-square w-full rounded-xl object-contain"
            />

            <Image
              alt={data.imageAlt}
              src={data.imageUrl}
              layout="responsive"
              width={1}
              height={1}
              className="aspect-square w-full rounded-xl object-contain"
            />

            <Image
              alt={data.imageAlt}
              src={data.imageUrl}
              layout="responsive"
              width={1}
              height={1}
              className="aspect-square w-full rounded-xl object-contain"
            />
          </div>
        </div>

        <div className="sticky top-3">
          {isBestSeller ? (
            <span className="inline-block bg-indigo-200 text-indigo-800 px-2 rounded-full ">
              Bestseller
            </span>
          ) : null}

          <div className="mt-8 flex justify-between">
            <div className="max-w-[35ch]">
              <h1 className="text-2xl font-bold">{data.title}</h1>

              <p className="mt-0.5 text-sm">{data.category}</p>

              <div className="mt-2 -ml-0.5 flex">
                <div className="mt-2 flex items-center">
                  {Array(5)
                    .fill(1)
                    .map((el, i) => {
                      return (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i + el <= Math.round(data.rating.rate)
                              ? "text-indigo-500"
                              : " text-gray-400"
                          }`}
                        />
                      );
                    })}
                  <span className="ml-2 text-gray-600 text-sm">
                    {data.rating.count} reviews
                  </span>
                </div>
              </div>
            </div>

            <p className="text-lg font-bold">${data.price}</p>
          </div>

          <details className="group relative mt-4">
            <summary className="block">
              <div>
                <div className="prose max-w-none group-open:hidden">
                  <p>{data.description}</p>
                </div>

                <span className="mt-4 cursor-pointer text-sm font-medium underline group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0">
                  Read More
                </span>
              </div>
            </summary>

            <div className="prose max-w-none pb-6 text-justify">
              <p>{data.description}</p>
              <article className="prose lg:prose-xl">
                {data.longDescription}
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
                    id: data.id,
                    price: Number.parseFloat(data.price),
                    title: data.title,
                    quantity: 1,
                    imageUrl: data.imageUrl,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProductsLayout>
  );
};
