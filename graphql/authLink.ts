import { ApolloLink } from '@apollo/client'
import { authToken } from './errorLink'

type Headers = {
  Authorization?: string
}

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : authToken;

  operation.setContext(({ headers }: { headers: Headers }) => ({
    headers: {
      ...headers,
      Authorization: "Bearer " + accessToken,
    },
  }))

  return forward(operation)
})

export default authLink