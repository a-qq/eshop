import type { CodegenConfig } from "@graphql-codegen/cli";
import { GraphqlUrl } from "./utils";

const graphqlUrl = GraphqlUrl();

const config: CodegenConfig = {
  overwrite: true,
  schema: graphqlUrl,
  documents: "graphql/*.graphql",
  generates: {
    "generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
