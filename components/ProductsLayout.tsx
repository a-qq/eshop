import { ReactNode } from "react";

interface LayoutProductsProps {
  children: ReactNode;
}

export const ProductsLayout = ({ children }: LayoutProductsProps) => {
  return (
    <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      {children}
    </div>
  );
};
