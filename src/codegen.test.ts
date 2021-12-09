import {
  generate,
  generateComponentImports,
  generateRouteObjects,
} from './codegen';
import { resolveOptions, resolvePages, resolveRoutes } from './resolver';
import { ResolvedOptions, ResolvedPages, ResolvedRoute } from './types';

const pageDir = 'examples/react/src/pages';

let options: ResolvedOptions;
let pages: ResolvedPages;
let routes: ResolvedRoute[];

beforeEach(() => {
  options = resolveOptions({ pageDir, async: false });
  pages = resolvePages(options);
  routes = resolveRoutes(pages, options);
});

test('codegen:generateComponentImports', () => {
  const code = generateComponentImports(routes, options);
  // console.log('code: ', code);
  expect(code.includes('import GlobalLayout')).toBe(true);
  pages.forEach(filaPath => {
    expect(code.includes(filaPath)).toBe(true);
  });
});

test('codegen:generateRouteObjects', () => {
  const code = generateRouteObjects(routes, options);
  // console.log('code: ', code);
  expect(code.includes('function DefaultLayout')).toBe(true);
  expect(code.includes('export const routes')).toBe(true);
});

test('codegen:generate', () => {
  const code = generate(routes, options);
  // console.log('code: ', code);
  expect(code.includes('export const pages')).toBe(true);
});
