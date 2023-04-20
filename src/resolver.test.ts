import { test, expect, beforeEach } from 'vitest';
import { resolveOptions, resolvePages, resolveRoutes, scan } from './resolver';
import { ResolvedOptions } from './types';

const pageDir = 'examples/react/src/pages';

let options: ResolvedOptions;

beforeEach(() => {
  options = resolveOptions({ pageDir });
});

test('resolver:resolveOptions', () => {
  expect(options).toEqual({
    extensions: ['tsx', 'ts', 'jsx', 'js'],
    pageDir,
    root: process.cwd(),
    layout: '_layout',
  });
});

test('resolver:scan', () => {
  const files = scan(options);

  expect(Array.isArray(files)).toBe(true);
  expect(files.length).toBe(9);
});

test('resolver:resolvePages', () => {
  const pages = resolvePages(options);
  expect(pages.size).toBe(9);
  expect(pages.has('*')).toBe(true);
  expect(pages.has('/')).toBe(true);
  expect(pages.has('/login')).toBe(true);
  expect(pages.has('/:id/user')).toBe(true);
  expect(pages.has('/article/:id')).toBe(true);
  expect(pages.has('/blog')).toBe(true);
  expect(pages.has('/settings/articles')).toBe(true);
  expect(pages.has('/settings/domain')).toBe(true);
});

test('resolver:resolveRoutes', () => {
  const pages = resolvePages(options);
  const routes = resolveRoutes(pages, options);
  expect(routes.length).toBe(9);
});
