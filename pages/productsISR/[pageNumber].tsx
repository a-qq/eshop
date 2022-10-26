import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getProducts, getProductsCount } from "../../apis/getProducts";
import { Footer } from "../../components/Footer";
import { Main } from "../../components/Main";
import { Navbar } from "../../components/Navbar";
import { Pagination } from "../../components/Pagination";
import { ProductCard } from "../../components/ProductCard";
import { InferGetStaticPaths } from "../../types/InferGetStaticPath";

const PAGE_SIZE = 24;

const ProductsISRPage = ({
  products, productCount
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter();
  
  if(router.isFallback)
    return <div>Loading...</div>;

  if (!products || !productCount) {
    return <div>Something went wrong!</div>;
  }
  
  return (
    <>
      <Navbar />
      <Main>
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
        <Pagination pageSize={PAGE_SIZE} total={productCount} />
      </Main>
      <Footer />
    </>
  );
};

export default ProductsISRPage;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPaths<typeof getStaticPaths>>) => {
  const productCount = await getProductsCount();

  if (!params?.pageNumber || !Number.parseInt(params.pageNumber) || Number.parseInt(params.pageNumber) > Math.ceil(productCount/PAGE_SIZE)) {
    return {
      notFound: true,
      props: {},
    };
  }

  const products = await getProducts(Number.parseInt(params.pageNumber), PAGE_SIZE);
  return {
    props: {
      products, productCount
    },
    revalidate: 60
  };
};


export const getStaticPaths = async () => {
  const productCount = await getProductsCount();
  const pageCount = Math.ceil(productCount / PAGE_SIZE);
  return {
    paths: Array.from({ length: pageCount }, (_, i) => ({
      params: {
        pageNumber: (i + 1).toString(),
      },
    })),
    fallback: 'blocking'
  };
};
