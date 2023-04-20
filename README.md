# vite-plugin-next-react-router

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/zoubingwu/vite-plugin-next-react-router/test.yaml)
![npm](https://img.shields.io/npm/v/vite-plugin-next-react-router)

A Next.js style file system based routing plugin for vite, inspired by [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages).

## Install

```sh
# with npm
npm install vite-plugin-next-react-router -D
```

```sh
# with yarn
yarn add vite-plugin-next-react-router -D
```

```sh
# with pnpm
pnpm add vite-plugin-next-react-router -D
```

## Usage

Add plugin to your `vite.config.js`

```js
import { reactRouterPlugin } from 'vite-plugin-next-react-router';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //...
    reactRouterPlugin(),
  ],
});
```

Config options like this, this is also the default config below:

```js
export default defineConfig({
  plugins: [
    reactRouterPlugin({
      pageDir: 'src/pages',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      // like '_app' in Next.js, `_document` is not supported since all rendering is done in client side
      layout: '_layout',
    }),
  ],
});
```

This plugin will scan your pages folder then automatically inject code to index html, you don't have to write any other code for initial rendering, just like Next.js. There is a example project under `/example/react` folder.

It follows most of the Next.js style file system based routing rules. You can check their docs [here](https://nextjs.org/docs/routing/introduction).

If you found any inconsistency with Next.js, please open an issue.
