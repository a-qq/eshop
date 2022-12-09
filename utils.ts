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
