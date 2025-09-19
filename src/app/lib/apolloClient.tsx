import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uploadLink = createUploadLink({
  uri: "http://69.62.116.59:4000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link: ApolloLink.from([uploadLink]),
  cache: new InMemoryCache(),
});

export default client;
