import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getProducts, getProductsCount } from "../../apis/getProducts";
import { ProductList } from "../../components/ProductList";
import { InferGetStaticPaths } from "../../types";

const PAGE_SIZE = 24;

const ProductsISRPage = ({
  products,
  productCount,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  if (!products || !productCount) {
    return <div>Something went wrong!</div>;
  }

  const detailsPath =
    router.pathname.slice(0, router.pathname.indexOf("/", 1)) + "/details";

  return (
    <ProductList
      products={products}
      pageSize={PAGE_SIZE}
      totalCount={productCount}
      detailsPath={detailsPath}
    />
  );
};

export default ProductsISRPage;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPaths<typeof getStaticPaths>>) => {
  const productCount = await getProductsCount();

  if (
    !params?.pageNumber ||
    !Number.parseInt(params.pageNumber) ||
    Number.parseInt(params.pageNumber) > Math.ceil(productCount / PAGE_SIZE)
  ) {
    return {
      notFound: true,
      props: {},
    };
  }

  const products = await getProducts(
    Number.parseInt(params.pageNumber),
    PAGE_SIZE
  );
  return {
    props: {
      products,
      productCount,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const productCount = await getProductsCount();
  const pageCount = Math.ceil(productCount / PAGE_SIZE);
  return {
    paths: Array.from({ length: pageCount > 10 ? 10 : pageCount }, (_, i) => ({
      params: {
        pageNumber: (i + 1).toString(),
      },
    })),
    fallback: "blocking",
  };
};
