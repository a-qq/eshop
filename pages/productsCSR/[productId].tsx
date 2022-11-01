import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getProduct } from "../../apis/getProducts";
import { ProductDetails } from "../../components/ProductDetails";
import { MarkdownCsr } from "../../components/MarkdownCsr";

const ProductIdPage = () => {
  const router = useRouter();
  const productId =
    (router.query.productId &&
      Number.parseInt(router.query.productId.toString())) ||
    0;
  const { data, error, isLoading } = useQuery(
    ["products", "details", productId],
    () => getProduct(productId)
  );

  if (isLoading) return "Loading...";

  if (!data || error) {
    return <div>Something went wrong!</div>;
  }

  return (
    <ProductDetails
      data={{
        id: data.id,
        title: data.title,
        price: data.price.toString(),
        category: data.category,
        description: data.description,
        imageUrl: data.image,
        imageAlt: data.title,
        rating: data.rating,
        longDescription: <MarkdownCsr>{data.longDescription}</MarkdownCsr>,
      }}
    />
  );
};

export default ProductIdPage;
