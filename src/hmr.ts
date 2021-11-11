import path from 'path';
import { ViteDevServer } from 'vite';
import { ResolvedOptions } from './types';
import { MODULE_ID_VIRTUAL } from './const';
import { normalizePathToRoute } from './utils';

export function invalidateCache(server: ViteDevServer) {
  const { moduleGraph } = server;
  const module = moduleGraph.getModuleById(MODULE_ID_VIRTUAL);
  if (module) {
    moduleGraph.invalidateModule(module);
  }
}

function isPagesDir(path: string, options: ResolvedOptions) {
  return path.startsWith(options.pageDir);
}

export function isTarget(path: string, options: ResolvedOptions) {
  return (
    isPagesDir(path, options) &&
    options.extensions.some(ext => path.endsWith(ext))
  );
}

export function handleHMR(
  server: ViteDevServer,
  pages: Map<string, string>,
  options: ResolvedOptions,
  clearRoutes: () => void
) {
  const { ws, watcher } = server;

  function fullReload() {
    invalidateCache(server);
    clearRoutes();
    ws.send({
      type: 'full-reload',
    });
  }

  watcher.on('add', async file => {
    const p = path.posix.normalize(file);
    if (isTarget(p, options)) {
      pages.set(normalizePathToRoute(p), file);
      fullReload();
    }
  });
  watcher.on('unlink', file => {
    const p = path.posix.normalize(file);
    if (isTarget(p, options)) {
      pages.delete(normalizePathToRoute(p));
      fullReload();
    }
  });
  watcher.on('change', async file => {
    const p = path.posix.normalize(file);
    if (isTarget(p, options)) {
      pages.set(normalizePathToRoute(p), file);
      fullReload();
    }
  });
}
