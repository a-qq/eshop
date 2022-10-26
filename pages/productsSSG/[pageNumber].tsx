import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { getProducts } from "../../apis/getProducts";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { Pagination } from "../../components/Pagination";
import { ProductCard } from "../../components/ProductCard";
import { InferGetStaticPaths } from "../../types/InferGetStaticPath";

const PAGE_SIZE = 24;
const TOTAL_PAGES = 10

const ProductsSGGPage = ({
  products,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {

  if (!products) {
    return null;
  }
  
  return (
    <>
      <Navbar />
        <ul className="mx-auto max-w-2xl py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Currently available products:
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                    href={`details/${product.id}`}
                  />
                </li>
              );
            })}
          </div>
        </ul>
        <Pagination pageSize={PAGE_SIZE} total={PAGE_SIZE*TOTAL_PAGES} />
      <Footer />
    </>
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

  const products = await getProducts(Number.parseInt(params.pageNumber, PAGE_SIZE));

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
