import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import createFileLink from './create-file-link';
import { ApolloLink } from 'apollo-link';

import { serverUriGraphQl, socketUri } from './constants';
import history from './history';

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      if (message === 'You must be logged in to do this') {
        history.push('/login');
      }
      return console.log(
        `[GraphQL error]: Message: ${message}`,
      );
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
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

const httpLinkWithAuth = ApolloLink.from([errorLink, authLink, httpLink]);

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
