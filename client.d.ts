declare module 'virtual:next-react-router' {
  import { RouteObject } from 'react-router-dom';

  export const routes: RouteObject[];

  export const pages: Array<{ route: string; meta?: Record<string, any> }>;
}
