import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { getProduct, getProducts } from "../../../apis/getProducts";
import { ProductDetails } from "../../../components/ProductDetails";
import { InferGetStaticPaths } from "../../../types/InferGetStaticPath";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Something went wrong..</div>;
  }

  return (
    <>
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
          longDescription: data.longDescription,
        }}
      />
    </>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const data = await getProducts(1, 240);
  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(),
        },
      };
    }),
    fallback: false,
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

  const data = await getProduct(+params.productId);

  return {
    props: {
      data,
    },
  };
};
