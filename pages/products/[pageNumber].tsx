import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import {
  GetProductsCountQuery,
  GetProductsCountDocument,
  GetProductPageQuery,
  GetProductPageQueryVariables,
  GetProductPageDocument,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { ProductList } from "../../components/ProductList";
import { apolloClient } from "../../graphql/apolloClient";
import { InferGetStaticPaths } from "../../types";
import { PageCount, PageSize } from "../../utils";

const ProductsISRPage = ({
  data,
  totalProductCount,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (!data || !totalProductCount) {
    return null;
  }

  const detailsPath =
    router.pathname.slice(0, router.pathname.indexOf("/", 1)) + "/details";
  const products = data.productsConnection.products.map((p) => {
    return {
      id: p.node.id,
      name: p.node.name,
      slug: p.node.slug,
      price: p.node.price,
      categories: p.node.categories.map((c) => {
        return {
          id: c.id,
          name: c.name,
        };
      }),
      imageUrl: p.node.images[0].url ?? null,
      reviews: p.node.reviews.map((r) => {
        return {
          id: r.id,
          rating: r.rating,
        };
      }),
      collections: p.node.collections.map((c) => {
        return {
          id: c.id,
          name: c.name,
        };
      }),
      href: detailsPath,
    };
  });
  return (
    <ProductList
      products={products}
      pageSize={PageSize()}
      totalProductCount={totalProductCount}
      detailsPath={detailsPath}
    />
  );
};

export default ProductsISRPage;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPaths<typeof getStaticPaths>>) => {
  const { pageCount, totalProductCount } = await getProductPageCount();
  if (
    !params?.pageNumber ||
    !Number.parseInt(params.pageNumber) ||
    Number.parseInt(params.pageNumber) > pageCount ||
    Number.parseInt(params.pageNumber) < 1
  ) {
    return {
      notFound: true,
      props: {},
    };
  }
  const pageNumber = Number.parseInt(params.pageNumber);
  const pageSize = PageSize();
  const offset = (pageNumber - 1) * pageSize;

  const { data } = await apolloClient.query<
    GetProductPageQuery,
    GetProductPageQueryVariables
  >({
    variables: {
      limit: PageSize(),
      offset: offset,
    },
    query: GetProductPageDocument,
  });

  return {
    props: {
      data,
      totalProductCount,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const { pageCount } = await getProductPageCount();

  return {
    paths: Array.from({ length: pageCount }, (_, i) => ({
      params: {
        pageNumber: (i + 1).toString(),
      },
    })),
    fallback: "blocking",
  };
};

async function getProductPageCount() {
  const { data } = await apolloClient.query<GetProductsCountQuery>({
    query: GetProductsCountDocument,
  });

  const totalProductCount = data.productsConnection.aggregate.count;

  const pageCount = PageCount(totalProductCount, PageSize());
  return { pageCount, totalProductCount };
}
