import { Suspense } from "react";
import { StoreApiResponse } from "../apis/getProducts";
import { LoadingSpinner } from "./LoadingSpinner";
import { Pagination } from "./Pagination";
import { ProductCard } from "./ProductCard";
import { ProductsLayout } from "./ProductsLayout";

interface ProductListProps {
  products: StoreApiResponse;
  totalCount: number;
  pageSize: number;
  detailsPath: string;
}

export const ProductList = ({
  products,
  pageSize,
  totalCount,
  detailsPath: detailsHref
}: ProductListProps) => {
  return (
    <ProductsLayout>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Currently available products:
      </h2>
      <Suspense fallback={<LoadingSpinner />}>
        <ul className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => {
            return (
              <li key={product.id} className="group relative">
                <ProductCard
                  title={product.title}
                  price={product.price.toString()}
                  category={product.category}
                  imageUrl={product.image}
                  imageAlt={product.title}
                  rating={product.rating}
                  href={`${detailsHref}/${product.id}`}
                />
              </li>
            );
          })}
        </ul>
      </Suspense>
      <Pagination
        pageSize={pageSize}
        total={totalCount}
        className="sticky mt-8 shadow-md rounded-lg bottom-0"
      />
    </ProductsLayout>
  );
};
