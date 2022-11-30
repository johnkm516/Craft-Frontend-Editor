import { ApolloClient, createHttpLink, from} from "@apollo/client";
import errorLink from './errorLink'
import authLink from './authLink'
import cache from './cache'

const httpLink = createHttpLink({
  uri: "http://localhost:7083/graphql"
});

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
export const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, createHttpLink({uri: "http://localhost:7083/graphql"})]),
    cache,
    credentials: 'include',
    uri: "http://localhost:7083/graphql",
  });
