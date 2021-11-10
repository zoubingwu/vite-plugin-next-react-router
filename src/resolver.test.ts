import { resolveOptions, resolvePages, resolveRoutes } from './resolver';
import { generate } from './codegen';

test('resolver:resolveOptions', () => {
  const options = resolveOptions({
    pageDir: 'examples/react/src/pages',
  });

  expect(options).toEqual({
    async: true,
    baseRoute: '',
    extensions: ['tsx', 'ts', 'jsx', 'js'],
    pageDir: 'examples/react/src/pages',
    root: process.cwd(),
  });

  const p = resolvePages(options);
  console.log('p: ', p);

  const routes = resolveRoutes(p, options);
  console.log('routes: ', routes);

  const code = generate(routes);
  console.log('code: ', code);
});
