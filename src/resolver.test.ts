import path from 'path';
import os from  'os';
import { resolveOptions, resolvePages, resolveRoutes, scan } from './resolver';
import { ResolvedOptions } from './types';

const pageDir = 'examples/react/src/pages';

let options: ResolvedOptions;

beforeEach(() => {
  options = resolveOptions({ pageDir });
});

test('resolver:resolveOptions', () => {
  expect(options).toEqual({
    async: true,
    extensions: ['tsx', 'ts', 'jsx', 'js'],
    pageDir,
    root: os.platform()!=='win32'? process.cwd():process.cwd().replace(/\\/g, '/'),
    output: path.join(process.cwd(), 'src', 'routes.tsx'),
  });
});

test('resolver:scan', () => {
  const files = scan(options.pageDir, options.extensions, options.root);
  // console.log('files: ', files);

  expect(Array.isArray(files)).toBe(true);
  expect(files.includes('_layout.tsx')).toBe(false);
  expect(files.some(f => path.basename(f).startsWith('_'))).toBe(false);
});

test('resolver:resolvePages', () => {
  const pages = resolvePages(options);
  // console.log('pages: ', pages);

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
  // console.log('routes: ', routes);

  expect(routes.length).toBe(9);
});
