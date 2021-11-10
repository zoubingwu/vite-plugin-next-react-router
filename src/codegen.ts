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
    globalLayoutFile ? `lazy(() => import('${globalLayoutFile}'))` : null
  }

export function RouteView({ fallback }) {
  return (
    <BrowserRouter>
      <Suspense fallback={fallback || null}>
        <Switch>
          {routes.map((route, i) => {
            const PageComp = lazy(route.component);
            let FinalPage = PageComp;

            if (GlobalLayout) {
              FinalPage = () => <GlobalLayout Component={PageComp} />;
            }

            return (
              <Route path={route.path} key={i} exact={route.exact}>
                <FinalPage />
              </Route>
            );
          })}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}`;
}
