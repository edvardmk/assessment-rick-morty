import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_API_URL,
  cache: new InMemoryCache(),
})

export default apolloClient
