import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ProductColor, ProductSize } from "./generated/graphql";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? R
  : never;

export type MarkdownStaticResult = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, string>
>;

export type Category = {
  id: string;
  name: string;
};

export type Image = {
  id: string;
  height?: number | null;
  width?: number | null;
  url: string;
  mimeType?: string | null;
};

export type Review = {
  id: string;
  content: string;
  headline: string;
  name: string;
  rating?: number | null;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  categories: Array<Category>;
  collections: Array<Collection>;
  reviews: Array<Review>;
  images: Array<Image>;
};

export type Collection = {
  id: string;
  name: string;
  description?: string | null;
};

export type ProductVariants =
  | ProductColorVariant
  | ProductSizeColorVariant
  | ProductSizeVariant;

export type ProductColorVariant = {
  id: string;
  name: string;
  color: ProductColor;
};

export type ProductSizeColorVariant = {
  id: string;
  name: string;
  color: ProductColor;
  size: ProductSize;
};

export type ProductSizeVariant = {
  id: string;
  name: string;
  size: ProductSize;
};

export type OrderItem = {
  id: string;
  quantity: number;
  total: number;
  product?: Product;
};

export type Order = {
  id: string;
  email: string;
  total: number;
  stripeCheckoutId: string;
  orderItems: Array<OrderItem>;
};
