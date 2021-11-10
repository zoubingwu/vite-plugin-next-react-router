import type { Plugin } from 'vite';
import { transformWithEsbuild } from 'vite';

import { MODULE_ID_VIRTUAL } from './const';
import { Route, UserOptions, ResolvedOptions, ResolvedRoute } from './types';
import { debug } from './utils';
import {
  resolvePages,
  resolveOptions,
  resolveRoutes,
  resolveGlobalLayout,
} from './resolver';
import { generate } from './codegen';

export { Route };

export function reactRouterPlugin(userOptions?: UserOptions): Plugin {
  let routes: ResolvedRoute[] | null = null;
  let options: ResolvedOptions;
  let pages: Map<string, string>;
  let globalLayout: string | null = null;

  return {
    name: 'vite-plugin-next-router',
    enforce: 'pre',
    async configResolved({ root }) {
      options = resolveOptions(userOptions, root);
      debug.options(options);
      pages = resolvePages(options);
    },
    resolveId(id) {
      if (id === MODULE_ID_VIRTUAL) {
        return id;
      }
    },
    async load(id) {
      if (id !== MODULE_ID_VIRTUAL) {
        return;
      }

      if (!routes) {
        routes = [];
        routes = resolveRoutes(pages, options);
        globalLayout = resolveGlobalLayout(options);
      }

      const code = generate(routes, globalLayout);

      return code;
    },
    async transform(code, id) {
      if (id === MODULE_ID_VIRTUAL) {
        const result = await transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'transform',
        });

        return { code: result.code, map: undefined };
      }

      return code;
    },
  };
}
