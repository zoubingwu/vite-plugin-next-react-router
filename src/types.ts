import React from 'react';

export interface Route {
  path: string;
  exact?: boolean;
  component: React.ComponentType<any> | Parameters<typeof React.lazy>[0];
}

export interface ResolvedRoute {
  path: string;
  exact?: boolean;
  componentPath: string;
  layoutPath?: string;
}

export interface Options {
  /**
   * Indicates how to load the component. Default is true, which means that components should be loaded by React.lazy.
   * @default true
   */
  async: boolean;

  /**
   * Path to the directory to search for page components.
   * @default 'src/pages'
   */
  pageDir: string;

  /**
   * Valid file extensions for page components.
   * @default ['js', 'jsx', 'ts', 'tsx']
   */
  extensions: string[];

  /**
   * Base path for route, e.g. `dashboard` -> '/dashboard', default is ''
   * @default ''
   */
  baseRoute: string;
}

export type UserOptions = Partial<Options>;

export interface ResolvedOptions extends Options {
  /**
   * Resolves to the `root` value from Vite config.
   */
  root: string;
}
