import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
import 'cross-fetch/polyfill';
import { CacheProvider, extractEmotion } from '@/utils';
import App from './App';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import typePolicies from './typePolicies';
import { StaticRouter } from 'react-router-dom/server';
import { AuthContextType } from './contexts/AuthContext';

export type SSR = typeof ssr;

interface SSROptions {
  graphqlUrl: string;
  cookie: string;
  route: string;
  query: Record<string, string>;
  template: string;
  userContext?: AuthContextType['auth'];
  wsJwt?: string;
}

export const ssr = async ({
  graphqlUrl,
  cookie,
  route,
  query,
  template,
  userContext,
  wsJwt,
}: SSROptions) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: graphqlUrl,
      credentials: 'include',
      headers: { cookie },
    }),
    cache: new InMemoryCache({ typePolicies, addTypename: false }),
  });

  const gql2 = gql;

  client.writeQuery({
    query: gql2`
    query GetUser {
      user
    }
    `,
    data: {
      user: userContext
    },
  });

  const params = new URLSearchParams(query).toString();

  const Wrapper = (
    <ApolloProvider client={client}>
      <StaticRouter location={`${route}?${params}`}>
        <CacheProvider>
          <App />
        </CacheProvider>
      </StaticRouter>
    </ApolloProvider>
  );

  const content = await renderToStringWithData(Wrapper);
  const { html, style } = extractEmotion(content);

  const initialState = client.extract();

  return template
    .replace('%STYLED_CSS%', style)
    .replace('%CONTENT%', html)
    .replace(
      '%INIT_SCRIPT%',
      /* html */ `
        <script id="__APOLLO_STATE__" type="application/json">${JSON.stringify(
          initialState,
        ).replace(/</g, '\\u003c')}</script>
        <script id="__WS_JWT__" type="application/json">${JSON.stringify({
          authentication: wsJwt,
        }).replace(/</g, '\\u003c')}</script>
      `,
    );
};
