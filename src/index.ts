import type { Plugin } from 'vite';

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
      ctx.generateRoutesModuleCode();
    },
    configureServer(server) {
      ctx.configureServer(server);
    },
  };
}
