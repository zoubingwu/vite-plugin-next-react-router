declare module 'virtual:next-react-router' {
  import { RouteObject } from 'react-router-dom';

  export const usePageRoutes: () => RouteObject[];
  export const usePages: () => Array<{
    route: string;
    meta?: Record<string, any>;
  }>;
}
