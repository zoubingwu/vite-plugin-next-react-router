# vite-plugin-next-react-router

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/zoubingwu/vite-plugin-next-react-router/test)
![npm](https://img.shields.io/npm/v/vite-plugin-next-react-router)

A Next.js style file system based routing plugin for vite, inspired by [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages). **Requires react-router v6.**

## Usage

1. Install with yarn:

```sh
yarn add vite-plugin-next-react-router -D
```

or with pnpm

```sh
pnpm add vite-plugin-next-react-router -D
```

2. Add to your `vite.config.js`

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

Pass config options like this:

```js
export default defineConfig({
  plugins: [
    //...

    // this is also the default config
    reactRouterPlugin({
      async: true,
      pageDir: 'src/pages',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
});
```

3. This plugin then will generate a route objects for you, you can import it from the virtual module named `virtual:next-react-router`, and use it with the `useRoutes` hook that react-router provides.

```js
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from 'virtual:next-react-router';

function App() {
  const element = useRoutes(routes);
  return element;
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

It follows Next.js style file system based routing rules and route files named `index` to the root of the pages directory. You can check their docs [here](https://nextjs.org/docs/routing/introduction).
