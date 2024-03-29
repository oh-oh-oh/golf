import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ServerError,
  split,
  from,
} from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { message } from 'antd';
import { hydrate, render, Renderer } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import typePolicies from './typePolicies';

import App from './App';

import 'antd/dist/antd.min.css';
import './style.css';
// import { BatchLink } from '@apollo/client/link/batch';

var renderer: Renderer;
var root = document.querySelector('[data-app]');
if (root && root.innerHTML !== '') {
  renderer = hydrate
} else {
  renderer = render;
}
const url = new URL(window.location.origin);
const cache = new InMemoryCache({ typePolicies, addTypename: false }).restore(
  JSON.parse(document.getElementById('__APOLLO_STATE__')!.innerHTML),
);
const wsJwtPayload = JSON.parse(
  document.getElementById('__WS_JWT__')!.innerHTML,
);

const wsProtocol = url.protocol === 'https:' ? 'wss:' : 'ws:';

const errorHandler = onError(({ networkError, graphQLErrors }) => {
  const loginRedirect = `${url.protocol}//${url.host}/login`;
  const serverError = networkError as ServerError;
  if (serverError?.statusCode === 401) {
    window.location.assign(loginRedirect);
  }

  const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again.';

  if (serverError?.statusCode === 500) {
    message.error(GENERIC_ERROR_MESSAGE);
  }

  if (graphQLErrors) {
    const firstErrorCode = graphQLErrors[0]?.extensions?.code;
    if (firstErrorCode === 500) message.error(GENERIC_ERROR_MESSAGE);
    if (firstErrorCode === 401) window.location.assign(loginRedirect);

    graphQLErrors.forEach(err => {
      console.error(err);
    });
  }
});

const batchHttpLink = new BatchHttpLink({
  uri: `${url.protocol}//${url.host}/graphql`,
  credentials: 'include',
  batchInterval: 20,
});

// const wsLink = new WebSocketLink({
//   uri: `${wsProtocol}//${url.host}/graphql`,
//   options: {
//     reconnect: true,
//     connectionParams: wsJwtPayload,
//   },
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   batchHttpLink,
//   wsLink,
// );

const client = new ApolloClient({
  link: from([errorHandler, batchHttpLink]),
  credentials: 'include',
  cache,
});

const styledCache = createCache({ key: 'golf' });

renderer(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <CacheProvider value={styledCache}>
        <App />
      </CacheProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.querySelector('[data-app]'),
);
