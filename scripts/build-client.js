#!/usr/bin/env node
require('dotenv/config');
const fs = require('fs');
const { resolve } = require('path');
const { build } = require('esbuild');
const { builtinModules } = require('module');
const { dependencies, devDependencies } = require('../package.json');

const args = process.argv.slice(2);
const isSSR = process.env.TARGET_ENV === 'server';

const processEnv = {
  NOD_ENV: null,
};

const env = Object.fromEntries(
  Object.entries(processEnv).map(([key, value]) => [
    `process.env.${key}`,
    value ?? JSON.stringify(process.env[key]),
  ]),
);

const distFolder = `dist/${isSSR ? 'client-server' : 'client'}`;
const jsDist = isSSR ? 'index.js' : 'assets/index.js';
const html = fs.readFileSync('client/index.html', 'utf-8');

fs.mkdirSync(distFolder, { recursive: true });
fs.writeFileSync(
  `${distFolder}/index.html`,
  `${html
    .replace('<script type="module" src="/index.tsx"></script>', '')
    .replace(
      '%STYLED_CSS%',
      `<link rel="stylesheet" href="/assets/index.css" />%STYLED_CSS%`,
    )}<script src="/${jsDist}"></script>`,
);

const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;

build({
  entryPoints: [isSSR ? 'client/ssr.tsx' : 'client/index.tsx'],
  bundle: true,
  outfile: `${distFolder}/${jsDist}`,
  inject: [resolve(__dirname, 'react-shim.js')],
  jsxFactory: '__esBuildCreateElement',
  jsxFragment: '__esBuildFragment',
  platform: isSSR ? 'node' : 'browser',
  sourcemap: DEV,
  minify: PROD,
  target: isSSR ? ['node14'] : ['chrome94'],
  define: {
    ...env,
    'process.env': JSON.stringify(processEnv),
  },
  external: isSSR
    ? Object.keys(dependencies)
        .concat(Object.keys(devDependencies))
        .concat(builtinModules)
    : [],
  watch: args.includes('-w') || args.includes('--watch'),
}).catch(() => process.exit(1));
