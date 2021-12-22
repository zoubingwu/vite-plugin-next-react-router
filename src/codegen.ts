import fs from 'fs';
import path from 'path';

import { resolveGlobalLayout } from './resolver';
import { generateRoutesCode } from './template';
import { ResolvedOptions, ResolvedRoute } from './types';

export function generateComponentCall(
  route: ResolvedRoute,
  options: ResolvedOptions
): string {
  return `<${
    options.async
      ? `Dynamic${route.componentName}`
      : `Static${route.componentName}`
  } />`;
}

function stripExt(p: string) {
  return p.replace(path.extname(p), '');
}

export function transformToRelativePath(to: string, from: string) {
  return './' + stripExt(path.relative(path.dirname(path.resolve(from)), to));
}

export const dynamicPageImports = (
  routes: ResolvedRoute[],
  options: ResolvedOptions
) =>
  routes.reduce((acc, route) => {
    return (
      acc +
      `const Dynamic${
        route.componentName
      } = React.lazy(() => import('${transformToRelativePath(
        route.componentPath,
        options.output
      )}'));\n`
    );
  }, '');

export const staticPageImports = (
  routes: ResolvedRoute[],
  options: ResolvedOptions
) =>
  routes.reduce((acc, route) => {
    return (
      acc +
      `import Static${route.componentName} from '${transformToRelativePath(
        route.componentPath,
        options.output
      )}'\n`
    );
  }, '');

export const staticMetaImports = (
  routes: ResolvedRoute[],
  options: ResolvedOptions
) => {
  return routes.reduce((acc, route) => {
    const routeComponentCode = fs.readFileSync(route.componentPath, 'utf8');
    if (routeComponentCode.includes('export const meta')) {
      return (
        acc +
        `import { meta as Static${
          route.componentName
        }Meta } from '${transformToRelativePath(
          route.componentPath,
          options.output ?? path.join(options.root, 'src', 'pages.ts')
        )}'\n`
      );
    }

    return acc;
  }, '');
};

export const layoutImport = (options: ResolvedOptions) => {
  const layout = resolveGlobalLayout(options);
  let imports = '';
  if (!layout) {
    imports += `import { Outlet } from 'react-router-dom';`;
  }
  imports = layout
    ? `import ${layout.componentName} from '${transformToRelativePath(
        layout.componentPath,
        options.output
      )}'`
    : '';
  const element = `<${layout ? layout.componentName : 'Outlet'} />`;

  return { imports, element };
};

export const routeObjects = (
  routes: ResolvedRoute[],
  options: ResolvedOptions
) =>
  routes
    .map(route => {
      return `{ path: '${route.path}', element: ${generateComponentCall(
        route,
        options
      )}, ${route.index ? 'index: true' : ''}},\n`;
    })
    .join(' '.repeat(6))
    .trim();

export const pageObjects = (routes: ResolvedRoute[]) =>
  routes
    .filter(r => r.path !== '*')
    .map(route => {
      const routeComponentCode = fs.readFileSync(route.componentPath, 'utf8');
      if (routeComponentCode.includes('export const meta')) {
        return `{ route: '${route.path}', meta: Static${route.componentName}Meta },\n`;
      }
      return `{ route: '${route.path}' },\n`;
    })
    .join(' '.repeat(2))
    .trim();

export function generateRoutesModuleCode(
  routes: ResolvedRoute[],
  options: ResolvedOptions
) {
  const { imports, element } = layoutImport(options);
  const staticPageMetaImports = staticMetaImports(routes, options);
  const pages = pageObjects(routes);

  return generateRoutesCode({
    layoutImport: imports,
    pageImports: options.async
      ? dynamicPageImports(routes, options)
      : staticPageImports(routes, options),
    layoutElement: element,
    routes: routeObjects(routes, options),
    pages,
    staticPageMetaImports,
  });
}
