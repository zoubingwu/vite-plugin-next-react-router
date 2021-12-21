import { generate } from './codegen';
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

test('codegen:generate', () => {
  const code = generate(routes, options);
  // console.log('code: ', code);
  expect(code.includes('export const usePages')).toBe(true);
  expect(code.includes('export const usePageRoutes')).toBe(true);
});
