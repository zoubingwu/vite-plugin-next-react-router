import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalLayout from './src/pages/_layout.tsx'
import * as StaticIndex from './src/pages/index.tsx'
import * as StaticBlogIndex from './src/pages/blog/index.tsx'
import * as StaticLogin from './src/pages/login.tsx'
import * as StaticIdUser from './src/pages/[id]/user.tsx'
import * as StaticArticleId from './src/pages/article/[id].tsx'
import * as StaticBlogId from './src/pages/blog/[id].tsx'
import * as StaticSettingsArticlesIndex from './src/pages/settings/articles/index.tsx'
import * as StaticSettingsDomainIndex from './src/pages/settings/domain/index.tsx'
import * as StaticAll from './src/pages/[...all].tsx'


export const usePageRoutes = () => {
  return React.useMemo(() => [
    {
      path: '/',
      element: <GlobalLayout />,
      children: [
        { path: '/', element: <StaticIndex.default />, index: true},
{ path: '/blog', element: <StaticBlogIndex.default />, index: true},
{ path: '/login', element: <StaticLogin.default />, },
{ path: '/:id/user', element: <StaticIdUser.default />, },
{ path: '/article/:id', element: <StaticArticleId.default />, },
{ path: '/blog/:id', element: <StaticBlogId.default />, },
{ path: '/settings/articles', element: <StaticSettingsArticlesIndex.default />, index: true},
{ path: '/settings/domain', element: <StaticSettingsDomainIndex.default />, index: true},
{ path: '*', element: <StaticAll.default />, },
      ]
    }
  ])
}

export const usePages = () => {
  return React.useMemo(() => [
    { route: '/' },
{ route: '/blog', meta: StaticBlogIndex.meta },
{ route: '/login' },
{ route: '/:id/user' },
{ route: '/article/:id' },
{ route: '/blog/:id' },
{ route: '/settings/articles' },
{ route: '/settings/domain' },
  ])
}