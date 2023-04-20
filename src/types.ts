export interface ResolvedRoute {
  route: string;
  path: string; // absolute path to component
  name: string;
  index?: boolean;
}

export interface Options {
  /**
   * Path to the directory to search for page components.
   * Default value is 'src/pages'.
   */
  pageDir: string;

  /**
   * Valid file extensions for page components.
   * Default value is ['js', 'jsx', 'ts', 'tsx'].
   */
  extensions: string[];

  /**
   * Layout file name.
   * Default value is '_layout'.
   */
  layout?: string;
}

export type UserOptions = Partial<Options>;

export interface ResolvedOptions extends Options {
  /**
   * Resolves to the `root` value from Vite config.
   */
  root: string;
  layout: string;
}

type PageRoute = string;
type FilePath = string;

export type ResolvedPages = Map<PageRoute, FilePath>;
