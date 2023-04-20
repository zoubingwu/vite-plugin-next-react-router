import { resolveGlobalLayout } from './resolver';
import { generateRoutesCode } from './template';
import { ResolvedOptions, ResolvedRoute } from './types';
import { stripExt } from './utils';

export const layoutImport = (options: ResolvedOptions) => {
  const layout = resolveGlobalLayout(options);
  let imports = '';
  if (!layout) {
    imports += `import { Outlet } from 'react-router-dom';`;
  }
  imports = layout
    ? `import ${layout.name} from '${stripExt(layout.path)}'`
    : '';
  const element = layout ? layout.name : 'Outlet';

  return { imports, element };
};

export const routeObjects = (
  routes: ResolvedRoute[],
  layoutElement: string
) => {
  const children = routes
    .map(route => {
      return `{
        path: '${route.route}',
        async lazy() {
          const c = await import('${stripExt(route.path)}');
          return { Component: c.default }
        },
        index: ${route.index ?? false}
      },\n`;
    })
    .join(' ')
    .trim();

  return `{
    path: '/',
    element: React.createElement(${layoutElement}, null),
    children: [${children}]
  }`;
};

export function codegen(routes: ResolvedRoute[], options: ResolvedOptions) {
  const { imports, element } = layoutImport(options);

  return generateRoutesCode({
    layoutImport: imports,
    layoutElement: element,
    routes: routeObjects(routes, element),
  });
}
