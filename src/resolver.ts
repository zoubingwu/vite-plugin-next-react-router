import path from 'path';
import { normalizePath } from 'vite';
import fg from 'fast-glob';
import type {
  ResolvedOptions,
  ResolvedPages,
  ResolvedRoute,
  UserOptions,
} from './types';
import { getComponentName, normalizePathToRoute, sortRoutes } from './utils';
import { DEFAULT_EXT, DEFAULT_PAGE_DIR } from './const';

export function resolveLayoutFile(options: ResolvedOptions) {
  const layout = options.layout ? options.layout : '_';
  return `${layout}.{${options.extensions.join()}}`;
}

export function resolvePages(options: ResolvedOptions) {
  const files = scan(options);
  return fileToRouteMap(files);
}

export function resolveOptions(
  userOptions?: UserOptions,
  viteRoot?: string
): ResolvedOptions {
  const root = viteRoot ?? normalizePath(process.cwd());
  return {
    root,
    pageDir: userOptions?.pageDir ?? DEFAULT_PAGE_DIR,
    extensions: userOptions?.extensions ?? DEFAULT_EXT,
    layout: userOptions?.layout ?? '_layout',
  };
}

export function scan(options: ResolvedOptions) {
  const { root, extensions, pageDir: targetDir } = options;
  const fullPathOfTargetDir = path.resolve(root, targetDir);
  return fg.sync(
    [`**/*.{${extensions.join()}}`, `!${resolveLayoutFile(options)}`],
    {
      onlyFiles: true,
      cwd: fullPathOfTargetDir,
    }
  );
}

export function fileToRouteMap(files: string[]): ResolvedPages {
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
    const filePath = map.get(route)!;
    const absolutePath = path.resolve(options.pageDir, filePath);

    const routeObj: ResolvedRoute = {
      route: route,
      path: absolutePath,
      name: getComponentName(filePath),
    };

    if (path.basename(filePath, path.extname(filePath)) === 'index') {
      routeObj.index = true;
    }

    return routeObj;
  });
}

export function resolveGlobalLayout(
  options: ResolvedOptions
): ResolvedRoute | null {
  const globalLayoutFiles = fg.sync(resolveLayoutFile(options), {
    onlyFiles: true,
    cwd: options.pageDir,
  });

  if (globalLayoutFiles.length === 1) {
    const filePath = globalLayoutFiles[0];
    return {
      path: path.resolve(options.pageDir, globalLayoutFiles[0]),
      name: 'GlobalLayout',
      route: filePath,
    };
  } else if (globalLayoutFiles.length > 1) {
    throw new Error('Multiple _layout files found');
  }

  return null;
}
