import type { Plugin } from 'vite';
import { transformWithEsbuild } from 'vite';

import { UserOptions } from './types';
import { Context } from './context';
import { MODULE_ID_VIRTUAL } from './const';

function withReactRouter(userOptions?: UserOptions): Plugin {
  const ctx: Context = new Context(userOptions);

  return {
    name: 'vite-plugin-next-router',
    enforce: 'pre',
    configureServer(server) {
      ctx.configureServer(server);
    },
    async configResolved({ root }) {
      ctx.root = root;
      ctx.resolveOptions();
      ctx.search();
    },
    resolveId(id) {
      if (id === '/' + MODULE_ID_VIRTUAL) {
        return MODULE_ID_VIRTUAL;
      }
    },
    async load(id) {
      if (id === MODULE_ID_VIRTUAL) {
        const result = await transformWithEsbuild(
          ctx.generateRoutesModuleCode(),
          'routes.jsx',
          {
            jsx: 'transform',
            loader: 'jsx',
          }
        );

        return result;
      }
    },
    transformIndexHtml: {
      enforce: 'pre',
      transform: () => {
        return [
          {
            tag: 'script',
            attrs: { type: 'module' },
            children: `import "/${MODULE_ID_VIRTUAL}"`,
            injectTo: 'body',
          },
        ];
      },
    },
  };
}

export default withReactRouter;
