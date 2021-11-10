declare module 'virtual:react-router' {
  import React from 'react';

  export interface Route {
    path: string;
    exact?: boolean;
    component: Parameters<typeof React.lazy>[0];
  }

  export const routes: Route[];

  export const GlobalLayout: React.ComponentType<{
    Component: React.ComponentType<{}>;
  }>;

  export const RouteView: React.FC<{ fallback?: React.ReactNode | null }>;
}
