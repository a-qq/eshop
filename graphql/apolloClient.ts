import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphqlUrl } from "../utils";

const apolloUri = GraphqlUrl();

export const apolloClient = new ApolloClient({
  uri: apolloUri,
  cache: new InMemoryCache(),
});
