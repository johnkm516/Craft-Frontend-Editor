'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'graphql/apollo-client';
import { Provider } from "react-redux";
import { store } from "../redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client= {apolloClient}>
      <Provider store={store}>
        {children}
      </Provider>
    </ApolloProvider>
  );
}