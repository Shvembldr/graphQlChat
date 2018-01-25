import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const token = localStorage.getItem('x-token');
const refreshToken = localStorage.getItem('x-refresh-token');

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      token,
      refreshToken,
    }
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-token': token ? token : null,
      'x-refresh-token': refreshToken ? refreshToken : null
    }
  }
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const httpLinkWithAuth = authLink.concat(httpLink);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithAuth,
);


export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});