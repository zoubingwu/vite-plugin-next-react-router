import fs from 'fs';

import { resolveGlobalLayout } from './resolver';
import { generateAsyncCode, generateSyncCode } from './template';
import { ResolvedOptions, ResolvedRoute } from './types';

export function generateComponentCall(
  route: ResolvedRoute,
  options: ResolvedOptions
): string {
  return `<${
    options.async
      ? `Dynamic${route.componentName}`
      : `Static${route.componentName}.default`
  } />`;
}

export function generate(
  routes: ResolvedRoute[],
  options: ResolvedOptions
): string {
  const layout = resolveGlobalLayout(options);
  const layoutImport = layout
    ? `import ${layout.componentName} from '${layout.componentPath}'`
    : '';
  const routesCode = routes
    .map(route => {
      return `{ path: '${route.path}', element: ${generateComponentCall(
        route,
        options
      )}, ${route.index ? 'index: true' : ''}},`;
    })
    .join('\n');

  if (options.async) {
    const layoutElement = `<${
      layout ? layout.componentName : 'DefaultLayout'
    } />`;
    const dynamicPageImports = routes.reduce((acc, route) => {
      return (
        acc +
        `const Dynamic${route.componentName} = React.lazy(() => import('${route.componentPath}'));\n`
      );
    }, '');
    const dynamicImports = routes.reduce((acc, route) => {
      return acc + `import('${route.componentPath}'),\n`;
    }, '');
    const pages = routes
      .filter(r => r.path !== '*')
      .map((route, i) => {
        const routeComponentCode = fs.readFileSync(route.componentPath, 'utf8');
        if (routeComponentCode.includes('export const meta')) {
          return `{ route: '${route.path}', meta: res[${i}].meta },`;
        }
        return `{ route: '${route.path}' },`;
      })
      .join('\n');

    return generateAsyncCode({
      layoutImport,
      dynamicPageImports,
      layoutElement,
      routes: routesCode,
      dynamicImports,
      pages,
    });
  } else {
    const layoutElement = `<${layout ? layout.componentName : 'Outlet'} />`;

    return generateSyncCode({
      layoutImport,
      layoutElement,
      staticPageImports: routes.reduce((acc, route) => {
        return (
          acc +
          `import * as Static${route.componentName} from '${route.componentPath}'\n`
        );
      }, ''),
      routes: routesCode,
      pages: routes
        .filter(r => r.path !== '*')
        .map(route => {
          const routeComponentCode = fs.readFileSync(
            route.componentPath,
            'utf8'
          );
          if (routeComponentCode.includes('export const meta')) {
            return `{ route: '${route.path}', meta: Static${route.componentName}.meta },`;
          }
          return `{ route: '${route.path}' },`;
        })
        .join('\n'),
    });
  }
}
