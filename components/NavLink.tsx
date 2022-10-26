import { useRouter } from "next/router";
import Link from "next/link";
import { ReactText } from "react";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  children: ReactText;
  active: string;
  inactive?: string;
  className?: string;
}

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export const NavLink = ({
  href,
  exact = false,
  children,
  active,
  inactive,
  className,
  ...props
}: NavLinkProps) => {
  const { asPath } = useRouter();
  const pathToCompare = exact ? asPath : stripQueryAndFragment(asPath);
  const hrefToCompare = exact ? href : stripQueryAndFragment(href);
  const isActive =
    addTrailingSlash(pathToCompare) === addTrailingSlash(hrefToCompare);

  return (
    <Link href={href}>
      <a
        className={classNames(
          isActive ? active + " " + className : inactive + " " + className
        )}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

const stripQueryAndFragment = (path: string) => path.split("?")[0];
const addTrailingSlash = (path: string) =>
  path.endsWith("/") ? path : path + "/";
