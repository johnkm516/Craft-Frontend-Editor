import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'graphql/apollo-client';
import App from 'next/app';
import React from 'react';
//import { Provider } from 'react-redux';

import '../styles/app.css';

class MyApp extends App {
  render() {
    const { Component, pageProps} = this.props;
    return (
      //<Provider store={store}>
        <ApolloProvider client= {apolloClient}>
        <Component {...pageProps} />
        </ApolloProvider>
      //</Provider>
    );
  }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
