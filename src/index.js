import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import 'semantic-ui-css/semantic.min.css';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('x-token');
  const refreshToken = localStorage.getItem('x-refresh-token');
  return {
    headers: {
      ...headers,
      'x-token': token ? token : null,
      'x-refresh-token': refreshToken ? refreshToken : null
    }
  }
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
