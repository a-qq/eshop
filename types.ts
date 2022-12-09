import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? R
  : never;

export type MarkdownStaticResult = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, string>
>;