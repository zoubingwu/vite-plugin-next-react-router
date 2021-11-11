declare module 'virtual:next-react-router' {
  import React from 'react';

  export interface Route {
    path: string;
    exact?: boolean;
    component: Parameters<typeof React.lazy>[0];
  }

  export const routes: Route[];

  export const GlobalLayout: React.ComponentType<{
    children: React.ReactNode | undefined;
  }>;
}
