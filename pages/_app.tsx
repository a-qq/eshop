import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "../components/Layout";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { useRouter } from "next/router";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const APP_URL = process.env.NEXT_PUBLIC_URL?.split(";")[0];

  if (!APP_URL) {
    throw new Error("NEXT_PUBLIC_URL environment variable is empty!");
  }

  const url = (APP_URL + router.asPath).split("?")[0];
  return (
    <Layout>
      <DefaultSeo {...SEO} canonical={url} openGraph={{ url: url }} />
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  );
}

export default MyApp;
