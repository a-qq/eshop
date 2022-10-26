import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { ProductCard } from "../../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Pagination, usePagination } from "../../components/Pagination";
import { getProducts } from "../../apis/getProducts";

const ProductsCSRPage = () => {
  const { pageNumber } = usePagination();
  const overAssumedValue = pageNumber > 10;
  // constants assumed in advance
  const PAGE_SIZE = 24;
  const TOTAL_PRODUCT_COUNT = 240;
  const { data, error, isLoading } = useQuery(
    ["products", "list", pageNumber],
    () => getProducts(pageNumber, PAGE_SIZE),
    { suspense: true, enabled: !overAssumedValue }
  );

  
  if (!data || error || overAssumedValue) {
    return <div>Something went wrong</div>;
  }

  if(isLoading)
    return <div>Loading...</div>
  
  return (
    <>
      <Navbar />
      <ul className="mx-auto max-w-2xl py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Currently available products:
        </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((product) => {
              return (
                <li key={product.id} className="group relative">
                  <ProductCard
                    title={product.title}
                    price={product.price.toString()}
                    category={product.category}
                    imageUrl={product.image}
                    imageAlt={product.title}
                    rating={product.rating}
                    href={`/productsCSR/${product.id}`}
                  />
                </li>
              );
            })}
          </div>
      </ul>

      <Pagination pageSize={PAGE_SIZE} total={TOTAL_PRODUCT_COUNT} />
      <Footer />
    </>
  );
};

export default ProductsCSRPage;
