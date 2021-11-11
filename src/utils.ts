import path from 'path';
import Debug from 'debug';
import type { OutputBundle } from 'rollup';

import { MATCH_ALL_ROUTE } from './const';

export const debug = {
  hmr: Debug('vite-plugin-react-router:hmr'),
  gen: Debug('vite-plugin-react-router:gen'),
  options: Debug('vite-plugin-react-router:options'),
  cache: Debug('vite-plugin-react-router:cache'),
  pages: Debug('vite-plugin-react-router:pages'),
};

export function isCatchAll(filename: string) {
  return /^\[\.{3}/.test(filename);
}

export function isDynamic(filename: string) {
  return /^\[(.+)\]$/.test(filename);
}

export function isDynamicRoute(route: string) {
  return (
    route === MATCH_ALL_ROUTE || route.split('/').some(s => s.startsWith(':'))
  );
}

export function normalizeFilenameToRoute(filename: string) {
  if (isCatchAll(filename)) {
    return MATCH_ALL_ROUTE;
  }

  if (filename === 'index') {
    return '/';
  }

  return isDynamic(filename) ? parameterizeDynamicRoute(filename) : filename;
}

export function parameterizeDynamicRoute(s: string) {
  return s.replace(/^\[(.+)\]$/, (_, p) => `:${p}`);
}

export function normalizeDirPathToRoute(dirPath: string) {
  return dirPath
    .split('/')
    .map(s => (isDynamic(s) ? parameterizeDynamicRoute(s) : s))
    .join('/');
}

export function normalizePathToRoute(p: string) {
  const { dir, name } = path.parse(p);
  const route = normalizeFilenameToRoute(name);
  if (route === MATCH_ALL_ROUTE) {
    return route;
  }

  return path.resolve(path.join('/', normalizeDirPathToRoute(dir), route));
}

export function countLength(p: string) {
  return path.resolve(p).split('/').filter(Boolean).length;
}

function sorter(a: string, b: string) {
  const len = countLength(a) - countLength(b);

  if (len !== 0) {
    return len;
  }

  return a.localeCompare(b);
}

export function sortRoutes(routes: string[]) {
  return routes.sort(sorter);
}

export function normalizeBundleChunkName(bundle: OutputBundle) {
  const files = Object.keys(bundle).map(i => path.basename(i));
  for (const chunk of Object.values(bundle)) {
    chunk.fileName = chunk.fileName.replace(/(\[|\])/g, '_');
    if (chunk.type === 'chunk') {
      for (const file of files)
        chunk.code = chunk.code.replace(file, file.replace(/(\[|\])/g, '_'));
    }
  }
}
