import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getProducts } from "../../apis/getProducts";
import { ProductList } from "../../components/ProductList";
import { InferGetStaticPaths } from "../../types/InferGetStaticPath";

const PAGE_SIZE = 24;
const TOTAL_PAGES = 10;

const ProductsSGGPage = ({
  products,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (!products) {
    return null;
  }

  const detailsPath =
    router.pathname.slice(0, router.pathname.indexOf("/", 1)) + "/details";
  return (
    <ProductList
      products={products}
      pageSize={PAGE_SIZE}
      totalCount={TOTAL_PAGES * PAGE_SIZE}
      detailsPath={detailsPath}
    />
  );
};

export default ProductsSGGPage;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPaths<typeof getStaticPaths>>) => {
  if (!params?.pageNumber) {
    return {
      notFound: true,
      props: {},
    };
  }

  const products = await getProducts(
    Number.parseInt(params.pageNumber, PAGE_SIZE)
  );

  return {
    props: {
      products,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: Array.from({ length: TOTAL_PAGES }, (_, i) => ({
      params: {
        pageNumber: (i + 1).toString(),
      },
    })),
    fallback: false,
  };
};
