"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./config");
const react_router_dom_1 = require("react-router-dom");
const Feed_1 = __importDefault(require("@/pages/Feed"));
const routes = {
    '/': Feed_1.default,
    '/login': Feed_1.default,
    '/feed': Feed_1.default,
};
const App = () => ((0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: Object.entries(routes).map(([path, Page]) => ((0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: path, element: (0, jsx_runtime_1.jsx)(Feed_1.default, {}, void 0) }, path))) }, void 0));
exports.default = App;
//# sourceMappingURL=index.js.map