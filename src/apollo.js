import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import createFileLink from './create-file-link';
import {serverUriGraphQl, socketUri} from "./constants";

const token = localStorage.getItem('x-token');
const refreshToken = localStorage.getItem('x-refresh-token');

const wsLink = new WebSocketLink({
  uri: socketUri,
  options: {
    reconnect: true,
    connectionParams: {
      token,
      refreshToken,
    },
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('x-token');
  const refreshToken = localStorage.getItem('x-refresh-token');
  return {
    headers: {
      ...headers,
      'x-token': token ? token : '',
      'x-refresh-token': refreshToken ? refreshToken : '',
    },
  };
});

const httpLink = createFileLink({ uri: serverUriGraphQl });

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
