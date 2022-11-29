import { ApolloClient, from, HttpLink } from "@apollo/client";
import errorLink from './errorLink'
import authLink from './authLink'
import cache from './cache'

const httpLink = new HttpLink({
  uri: process.env.API_URL
});

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
export const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache,
    credentials: 'include',
  });

export default apolloClient;
