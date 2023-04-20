import path from 'path';
import { ViteDevServer } from 'vite';
import { codegen } from './codegen';

import { resolveOptions, resolvePages, resolveRoutes } from './resolver';
import { UserOptions, ResolvedOptions, ResolvedPages } from './types';
import { debug } from './utils';

export function isTarget(p: string, options: ResolvedOptions) {
  return (
    p.startsWith(path.resolve(options.pageDir)) &&
    options.extensions.some(ext => p.endsWith(ext))
  );
}

export class Context {
  private _userOptions?: UserOptions;
  private _resolvedOptions?: ResolvedOptions;
  private _pages: ResolvedPages = new Map();
  private _server: ViteDevServer | null = null;

  public root: string = '.';

  constructor(userOptions?: UserOptions) {
    this._userOptions = userOptions;
  }

  public resolveOptions() {
    this._resolvedOptions = resolveOptions(this._userOptions, this.root);
    return this._resolvedOptions;
  }

  public search() {
    if (!this._resolvedOptions) {
      this.resolveOptions();
    }
    this._pages = resolvePages(this._resolvedOptions!);
    debug('pages: ', this._pages);

    return this._pages;
  }

  public configureServer(server: ViteDevServer) {
    this._server = server;
    this._server.watcher.on('unlink', filaPath =>
      this.invalidateAndRegenerateRoutes(filaPath)
    );
    this._server.watcher.on('add', filaPath =>
      this.invalidateAndRegenerateRoutes(filaPath)
    );
  }

  public invalidateAndRegenerateRoutes(filaPath: string) {
    if (!isTarget(filaPath, this._resolvedOptions!)) {
      return;
    }

    this._pages.clear();
    this.generateRoutesModuleCode();
  }

  public generateRoutesModuleCode() {
    if (this._pages.size === 0) {
      return '';
    }
    const routes = resolveRoutes(this._pages, this._resolvedOptions!);
    const code = codegen(routes, this._resolvedOptions!);

    return code;
  }
}
