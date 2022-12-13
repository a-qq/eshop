import { Suspense } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { Pagination } from "./Pagination";
import { ProductCard, ProductListItem } from "./ProductCard";

interface ProductListProps {
  products: ProductListItem[];
  totalProductCount: number;
  pageSize: number;
  detailsPath: string;
}

export const ProductList = ({
  products,
  pageSize,
  totalProductCount,
  detailsPath: detailsHref,
}: ProductListProps) => {
  const renderPagination = pageSize < totalProductCount;
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Currently available products:
      </h2>
      <Suspense fallback={<LoadingSpinner />}>
        <ul className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => {
            return (
              <li key={product.id} className="group relative">
                <ProductCard
                  {...product}
                  href={`${detailsHref}/${product.id}`}
                />
              </li>
            );
          })}
        </ul>
      </Suspense>
      {renderPagination && (
        <Pagination
          pageSize={pageSize}
          total={totalProductCount}
          className="sticky mt-8 shadow-md rounded-lg bottom-0"
        />
      )}
    </>
  );
};
