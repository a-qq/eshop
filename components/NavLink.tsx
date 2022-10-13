import { useRouter } from "next/router";
import Link from "next/link";
import { ReactText } from "react";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  children: ReactText;
  activeClassName: string;
  notActiveClassName?: string;
  className?: string;
}

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export const NavLink = ({
  href,
  exact = false,
  children,
  activeClassName,
  notActiveClassName,
  className,
  ...props
}: NavLinkProps) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href}>
      <a
        className={classNames(
          isActive
            ? activeClassName + " " + className
            : notActiveClassName + " " + className
        )}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};
