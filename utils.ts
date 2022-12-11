import { Review } from "./types";

export const checkIfValidUUID = (str: string) => {
  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
};

export const CartKey = () => {
  const CART_KEY = process.env.NEXT_PUBLIC_CART_KEY;

  if (!CART_KEY) {
    throw new Error("NEXT_PUBLIC_CART_KEY environment variable is empty!");
  }

  return CART_KEY;
};

export const GraphqlUrl = () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_URL environment variable is empty!");
  }

  return url;
};

export const PageSize = () => {
  const sizeString = process.env.NEXT_PUBLIC_PAGE_SIZE;
  if (!sizeString) {
    throw new Error("NEXT_PUBLIC_PAGE_SIZE environment variable is empty!");
  }

  const size = Number.parseInt(sizeString);

  if (!Number.isInteger(size))
    throw new Error(
      "NEXT_PUBLIC_PAGE_SIZE environment variable is not integer!"
    );

  if (size < 1)
    throw new Error(
      "NEXT_PUBLIC_PAGE_SIZE environment variable must be greater than 0!"
    );

  return size;
};

export const PageCount = (itemCount: number, pageSize: number) => {
  if (itemCount < 1) {
    throw new Error("itemCount must be greater than 0");
  }

  if (pageSize < 1) {
    throw new Error("pageSize must be greater than 0");
  }

  return Math.ceil(itemCount / pageSize);
};

export const calcAverageRating = (reviews: Partial<Review>[]) => {
  const sumRating = (count: number, review: Partial<Review>) =>
    count + (review.rating ?? 0);

  const reviewsWithRating = reviews?.filter((r) => !!r.rating);
  if (reviewsWithRating.length === 0) return null;

  const rate =
    reviewsWithRating.reduce(sumRating, 0) / reviewsWithRating.length;

  const count = reviewsWithRating.length;
  return { rate, count };
};
