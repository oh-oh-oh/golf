"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssr = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
require("cross-fetch/polyfill");
const utils_1 = require("@/utils");
const App_1 = __importDefault(require("./App"));
const ssr_1 = require("@apollo/client/react/ssr");
const typePolicies_1 = __importDefault(require("./typePolicies"));
const server_1 = require("react-router-dom/server");
const ssr = async ({ graphqlUrl, cookie, route, query, template, wsJwt, }) => {
    const client = new client_1.ApolloClient({
        ssrMode: true,
        link: (0, client_1.createHttpLink)({
            uri: graphqlUrl,
            credentials: 'include',
            headers: { cookie },
        }),
        cache: new client_1.InMemoryCache({ typePolicies: typePolicies_1.default, addTypename: false }),
    });
    const gql2 = client_1.gql;
    client.writeQuery({
        query: gql2 `
    query GetUser {
      user
    }
    `,
        data: {
            user: { name: 'tim' },
        },
    });
    const params = new URLSearchParams(query).toString();
    const Wrapper = ((0, jsx_runtime_1.jsx)(client_1.ApolloProvider, { client: client, children: (0, jsx_runtime_1.jsx)(server_1.StaticRouter, { location: `${route}?${params}`, children: (0, jsx_runtime_1.jsx)(utils_1.CacheProvider, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}, void 0) }, void 0) }, void 0) }, void 0));
    console.log('something!');
    const content = await (0, ssr_1.renderToStringWithData)(Wrapper);
    console.log('something!2', content);
    const { html, style } = (0, utils_1.extractEmotion)(content);
    const initialState = client.extract();
    return template
        .replace('%STYLED_CSS%', style)
        .replace('%CONTENT%', html)
        .replace('%INIT_SCRIPT%', `
        <script id="__APOLLO_STATE__" type="application/json">${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>
        <script id="__WS_JWT__" type="application/json">${JSON.stringify({
        authentication: wsJwt,
    }).replace(/</g, '\\u003c')}</script>
      `);
};
exports.ssr = ssr;
//# sourceMappingURL=ssr.js.map