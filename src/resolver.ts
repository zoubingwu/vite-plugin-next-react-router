import path from 'path';
import { normalizePath } from 'vite';
import fg from 'fast-glob';

import type { ResolvedOptions, UserOptions, ResolvedRoute } from './types';
import { normalizePathToRoute, sortRoutes, isDynamicRoute } from './utils';
import { DEFAULT_EXT, DEFAULT_PAGE_DIR } from './const';

export function resolvePages(options: ResolvedOptions) {
  const { root, pageDir, extensions } = options;
  const files = scan(pageDir, extensions, root);
  const routeMap = fileToRouteMap(files);
  return routeMap;
}

export function resolveOptions(
  userOptions?: UserOptions,
  viteRoot?: string
): ResolvedOptions {
  const resolveOptions: ResolvedOptions = {
    root: viteRoot ?? normalizePath(process.cwd()),
    async: userOptions?.async ?? true,
    pageDir: userOptions?.pageDir ?? DEFAULT_PAGE_DIR,
    extensions: userOptions?.extensions ?? DEFAULT_EXT,
    baseRoute: userOptions?.baseRoute ?? '',
  };

  return resolveOptions;
}

export function scan(targetDir: string, extensions: string[], root: string) {
  const fullPathOfTargetDir = path.resolve(root, targetDir);
  const files = fg.sync([`**/*.{${extensions.join()}}`, `!_app.*`], {
    onlyFiles: true,
    cwd: fullPathOfTargetDir,
  });

  return files;
}

export function fileToRouteMap(files: string[]) {
  const map = new Map<string, string>();
  files.forEach(file => {
    const route = normalizePathToRoute(file);
    map.set(route, file);
  });

  return map;
}

export function resolveRoutes(
  map: Map<string, string>,
  options: ResolvedOptions
): ResolvedRoute[] {
  const sortedRoutes = sortRoutes([...map.keys()]);

  return sortedRoutes.map(route => {
    const absolutePath = path.resolve(options.pageDir, map.get(route)!);

    const routeObj: ResolvedRoute = {
      path: route,
      componentPath: absolutePath,
    };

    if (!isDynamicRoute(route)) {
      routeObj.exact = true;
    }

    return routeObj;
  });
}

export function resolveGlobalLayout(options: ResolvedOptions) {
  const globalLayoutFile = fg.sync([`_app.{${options.extensions.join()}}`], {
    onlyFiles: true,
    cwd: options.pageDir,
  });

  if (globalLayoutFile.length === 1) {
    return path.resolve(options.pageDir, globalLayoutFile[0]);
  } else if (globalLayoutFile.length > 1) {
    throw new Error('Multiple _app files found');
  }

  return null;
}
