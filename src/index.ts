import type { Plugin } from 'vite';

import { MODULE_ID_VIRTUAL } from './const';
import { UserOptions } from './types';

import { Context } from './context';

export function reactRouterPlugin(userOptions?: UserOptions): Plugin {
  const ctx: Context = new Context(userOptions);

  return {
    name: 'vite-plugin-next-router',
    enforce: 'pre',
    async configResolved({ root }) {
      ctx.root = root;
      ctx.resolveOptions();
      ctx.search();
    },
    configureServer(server) {
      ctx.configureServer(server);
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

      return await ctx.generateVirtualModuleCode();
    },
  };
}
