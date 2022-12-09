import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { MarkdownStaticResult } from "../types";

export interface MarkdownStaticProps {
  children: MarkdownStaticResult;
}

export const MarkdownStatic = ({ children }: MarkdownStaticProps) => {
  const urls = process.env.NEXT_PUBLIC_URL?.split(";");

  if (!urls) {
    throw new Error("NEXT_PUBLIC_URL environment variable is empty!");
  }

  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props}></a>;
          }
          if (
            urls &&
            !urls.some((url) => href.startsWith(url)) &&
            !href.startsWith("/")
          ) {
            return <a href={href} {...props} rel="noopener noreferrer"></a>;
          }
          return (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
      }}
    />
  );
};
