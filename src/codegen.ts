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
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const routes = [${await generateRoutesCodeFromResolvedRoutes(routes)}];

export const GlobalLayout = ${
    globalLayoutFile
      ? `lazy(() => import('${globalLayoutFile}'))`
      : `() => <React.Fragment />`
  }

export function RouteView({ fallback }) {
  return (
    <BrowserRouter>
      <Suspense fallback={fallback || null}>
        <GlobalLayout Component={
          () => <Switch>
            {routes.map((route, i) => {
              return (
                <Route
                  path={route.path}
                  key={i}
                  exact={route.exact}
                  component={lazy(route.component)}
                />
              );
            })}
          </Switch>
        }>
        </GlobalLayout>
      </Suspense>
    </BrowserRouter>
  );
}`;
}
