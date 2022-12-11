import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { ProductDetails } from "../../../components/ProductDetails";
import { InferGetStaticPaths } from "../../../types";
import { serialize } from "next-mdx-remote/serialize";
import { apolloClient } from "../../../graphql/apolloClient";
import {
  GetProductDetailsByIdDocument,
  GetProductDetailsByIdQuery,
  GetProductDetailsByIdQueryVariables,
  GetProductsIdsDocument,
  GetProductsIdsQuery,
} from "../../../generated/graphql";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data || !data.product) {
    return null;
  }

  return (
    <ProductDetails
      product={{
        id: data.product.id,
        name: data.product.name,
        price: data.product.price,
        description: data.product.description,
        categories: data.product.categories.map((c) => {
          return {
            id: c.id,
            name: c.name
          }
        }),
        collections: data.product.collections.map((c) => {
          return {
            id: c.id,
            name: c.name,
            description: c.description
          }
        }),
        reviews: data.product.reviews.map((r) => {
          return {
            id: r.id,
            content: r.content,
            headline: r.headline,
            name: r.name,
            rating: r.rating
          }
        }),
        images: data.product.images.map((i) => {
          return {
            id: i.id,
            height: i.height,
            width: i.width,
            url: i.url,
            mimeType: i.mimeType,
          }
        }),
        longDescription: data.longDescription
      }}
    />
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsIdsQuery>({
    query: GetProductsIdsDocument,
  });

  return {
    paths: data.products.map((product) => {
      return {
        params: {
          productId: product.id,
        },
      };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPaths<typeof getStaticPaths>>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { data } = await apolloClient.query<
    GetProductDetailsByIdQuery,
    GetProductDetailsByIdQueryVariables
  >({
    variables: {
      id: params.productId,
    },
    query: GetProductDetailsByIdDocument,
  });

  if (!data || !data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data,
        longDescription: await serialize(data.product.description),
      },
    },
    revalidate: 60,
  };
};
