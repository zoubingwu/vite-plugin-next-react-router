# vite-plugin-next-react-router

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/zoubingwu/vite-plugin-next-react-router/Test)
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

1. Add to your `vite.config.js`

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
      output: './src/routes.tsx',
    }),
  ],
});
```

1. This plugin will scan you pages folder then automatically generate a routes objects and write to output so you can import them from there.

```js
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes'; // or use Vite's alias to simplify import path for nested components

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

1. For some meta info you want to add to the pages, you can export a `meta` object in you page component, and read them from `pages` objects like below:

```js
// page component
export default PageA() {
  //...
}

export const meta = {
  title: 'This is Page A',
  sort: 0
}


// Sider component
import { pages } from './routes';

function Sider() {
  const menuItems = pages
    .sort(/* sort it according to meta.sort */)\
    .map(/* map them to Sider menu items */)

  // render it
}

```

It follows Next.js style file system based routing rules and route files named `index` to the root of the pages directory. You can check their docs [here](https://nextjs.org/docs/routing/introduction).
