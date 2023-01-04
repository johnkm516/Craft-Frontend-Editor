import { ApolloClient, createHttpLink, fromPromise } from '@apollo/client'

import { onError } from '@apollo/client/link/error'

import cache from './cache'
import GET_AUTH_TOKEN from './queries/GET_AUTH_TOKEN'

let isRefreshing = false
let pendingRequests: Function[] = []
let authToken = ''
export { authToken };

const setIsRefreshing = (value: boolean) => {
  isRefreshing = value
}

const addPendingRequest = (pendingRequest: Function) => {
  pendingRequests.push(pendingRequest)
}

const renewTokenApiClient = new ApolloClient({
  link: createHttpLink({ uri: "http://localhost:7083/graphql" }),
  cache,
  credentials: 'include',
})

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback())
  pendingRequests = []
}

const getNewToken = async () => {
  const {
    data: {
        authLogin: {
            token: accessToken,
        },
    },
  } = await renewTokenApiClient.query({
    query: GET_AUTH_TOKEN,
    variables: {
      data: {
        password: process.env.NEXT_PUBLIC_PASSWORD,
        rememberMe: true,
        username: process.env.NEXT_PUBLIC_USERNAME
      }
    },
  })!

  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
  } else {
    authToken = accessToken;
  }
}

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err?.message) {
        case 'Unauthorized':
          if (!isRefreshing) {
            setIsRefreshing(true)

            return fromPromise(
              getNewToken().catch(() => {
                resolvePendingRequests()
                setIsRefreshing(false)
                if (typeof window !== 'undefined') {
                  localStorage.clear();
                  authToken = "";
                } else {
                  authToken = "";
                }

                // Cache shared with main client instance
                renewTokenApiClient!.writeQuery({
                    query: GET_AUTH_TOKEN,
                    data: {
                        authLogin: {
                            token: null,
                        },
                    }
                })

                return forward(operation)
              }),
            ).flatMap(() => {
              resolvePendingRequests()
              setIsRefreshing(false)

              return forward(operation)
            })
          } else {
            return fromPromise(
              new Promise<void>((resolve) => {
                addPendingRequest(() => resolve())
              }),
            ).flatMap(() => {
              return forward(operation)
            })
          }
      }
    }
  }
})

export default errorLink