import { ResolvedRoute } from './types';

export async function generateRoutesCodeFromResolvedRoutes(
  routes: ResolvedRoute[]
): Promise<string> {
  let code = '';

  for (const route of routes) {
    const { path, componentPath, exact } = route;

    code += `{
      path: '${path}',
      component: () => import('${componentPath}'),
      exact: ${exact},
    },\n`;
  }

  return code;
}

export async function generate(
  routes: ResolvedRoute[],
  globalLayoutFile?: string | null
): Promise<string> {
  return `
import React from 'react';

export const routes = [${await generateRoutesCodeFromResolvedRoutes(routes)}];

export const GlobalLayout = ${
    globalLayoutFile
      ? `React.lazy(() => import('${globalLayoutFile}'))`
      : `() => <React.Fragment />`
  }`;
}
