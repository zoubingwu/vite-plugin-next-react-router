import fs from 'fs';
import { snakeCase } from 'lodash';

import { resolveGlobalLayout } from './resolver';
import { ResolvedOptions, ResolvedRoute } from './types';

export const generateComponentImports = (
  routes: ResolvedRoute[],
  options: ResolvedOptions
): string => {
  let code = '';
  const layout = resolveGlobalLayout(options);
  if (layout) {
    code += `import ${layout.componentName} from '${layout.componentPath}'\n`;
  }
  code += routes.reduce((acc, route) => {
    return (
      acc +
      `import * as Static${route.componentName} from '${route.componentPath}'\n`
    );
  }, '');

  code += '\n';

  if (options.async) {
    code += routes.reduce((acc, route) => {
      return (
        acc +
        `const Dynamic${route.componentName} = lazy(() => import('${route.componentPath}'));\n`
      );
    }, '');
  }

  return code;
};

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

export function generatePageObject(routes: ResolvedRoute[]): string {
  let code = '';

  code += `export const pages = [
    ${routes
      .filter(r => r.path !== '*')
      .map(route => {
        const routeComponentCode = fs.readFileSync(route.componentPath, 'utf8');
        if (routeComponentCode.includes('export const meta')) {
          return `{ route: '${route.path}', meta: Static${route.componentName}.meta },`;
        }
        return `{ route: '${route.path}' },`;
      })
      .join('\n')}
]`;

  return code;
}

export function generateRouteObjects(
  routes: ResolvedRoute[],
  options: ResolvedOptions
): string {
  let code = '';
  const layout = resolveGlobalLayout(options);

  code += `
function DefaultLayout() {
  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  )
}

export const routes = [
  {
    path: '/',
    element: <${
      layout ? layout.componentName : options.async ? 'DefaultLayout' : 'Outlet'
    } />,
    children: [
      ${routes
        .map(route => {
          return `{ path: '${route.path}', element: ${generateComponentCall(
            route,
            options
          )}, ${route.index ? 'index: true' : ''}},`;
        })
        .join('\n')}
    ]
  }
]
`;

  return code;
}

export function generate(
  routes: ResolvedRoute[],
  options: ResolvedOptions
): string {
  return `
import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

${generateComponentImports(routes, options)}

${generatePageObject(routes)}

${generateRouteObjects(routes, options)}
`;
}
