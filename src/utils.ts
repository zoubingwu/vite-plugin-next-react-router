import path from 'path';
import consola from 'consola';
import { upperFirst, camelCase } from 'lodash-es';
import { name } from '../package.json';
import { MATCH_ALL_ROUTE } from './const';

export const debug = (message: any, ...args: any[]) => {
  if (process.env.DEBUG === name) {
    consola.info(message, ...args);
  }
};

export function isCatchAll(filename: string) {
  return /^\[\.{3}/.test(filename);
}

export function isDynamic(filename: string) {
  return /^\[(.+)\]$/.test(filename);
}

export function isIndexPage(filename: string) {
  return filename === 'index';
}

export function normalizeFilenameToRoute(filename: string) {
  if (isCatchAll(filename)) {
    return MATCH_ALL_ROUTE;
  }

  if (isIndexPage(filename)) {
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
  return [...routes].sort(sorter);
}

export function getComponentName(filePath: string) {
  const segments = filePath.split(path.sep);
  const extname = path.extname(filePath);
  const fileName = path.basename(filePath, extname);

  segments[segments.length - 1] = fileName;

  const name = segments.reduce((acc, segment) => {
    if (isDynamic(segment)) {
      return acc + upperFirst(camelCase(segment.replace(/^\[(.+)\]$/, '$1')));
    }

    return acc + upperFirst(camelCase(segment));
  }, '');

  return name;
}

export function stripExt(p: string) {
  return p.replace(path.extname(p), '');
}
