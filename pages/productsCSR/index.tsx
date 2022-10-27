import { useQuery } from "@tanstack/react-query";
import { usePagination } from "../../components/Pagination";
import { getProducts } from "../../apis/getProducts";
import { ProductList } from "../../components/ProductList";
import { useRouter } from "next/router";

const ProductsCSRPage = () => {
  const { pageNumber } = usePagination();
  const overAssumedValue = pageNumber > 10;
  // constants assumed in advance
  const PAGE_SIZE = 24;
  const TOTAL_PRODUCT_COUNT = 240;
  const router = useRouter();
  const { data, error, isLoading } = useQuery(
    ["products", "list", pageNumber],
    () => getProducts(pageNumber, PAGE_SIZE),
    { suspense: true, enabled: !overAssumedValue }
  );
  if (overAssumedValue) {
    return <div>Page not found</div>;
  }
  if (!data || error) {
    return <div>Something went wrong</div>;
  }
  if (isLoading) return <div>Loading...</div>;

  const detailsPath = router.pathname;

  return (
    <ProductList
      products={data}
      pageSize={PAGE_SIZE}
      totalCount={TOTAL_PRODUCT_COUNT}
      detailsPath={detailsPath}
    />
  );
};

export default ProductsCSRPage;
