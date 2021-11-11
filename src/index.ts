import type { Plugin } from 'vite';

import { MODULE_ID_VIRTUAL } from './const';
import { Route, UserOptions, ResolvedOptions, ResolvedRoute } from './types';
import { debug, normalizeBundleChunkName } from './utils';
import {
  resolvePages,
  resolveOptions,
  resolveRoutes,
  resolveGlobalLayout,
} from './resolver';
import { generate } from './codegen';
import { handleHMR } from './hmr';

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
    configureServer(server) {
      handleHMR(server, pages, options, () => {
        routes = null;
      });
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

      const code = await generate(routes, globalLayout);

      return code;
    },
    generateBundle(_, bundle) {
      normalizeBundleChunkName(bundle);
    },
  };
}
