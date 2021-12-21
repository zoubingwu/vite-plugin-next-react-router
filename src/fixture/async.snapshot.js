import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalLayout from './src/pages/_layout.tsx'

function DefaultLayout() {
  return (
    <React.Suspense fallback={null}>
      <Outlet />
    </React.Suspense>
  )
}

export const usePageRoutes = () => {
  const DynamicIndex = React.lazy(() => import('./src/pages/index.tsx'));
const DynamicBlogIndex = React.lazy(() => import('./src/pages/blog/index.tsx'));
const DynamicLogin = React.lazy(() => import('./src/pages/login.tsx'));
const DynamicIdUser = React.lazy(() => import('./src/pages/[id]/user.tsx'));
const DynamicArticleId = React.lazy(() => import('./src/pages/article/[id].tsx'));
const DynamicBlogId = React.lazy(() => import('./src/pages/blog/[id].tsx'));
const DynamicSettingsArticlesIndex = React.lazy(() => import('./src/pages/settings/articles/index.tsx'));
const DynamicSettingsDomainIndex = React.lazy(() => import('./src/pages/settings/domain/index.tsx'));
const DynamicAll = React.lazy(() => import('./src/pages/[...all].tsx'));


  return React.useMemo(() => [
    {
      path: '/',
      element: <GlobalLayout />,
      children: [{ path: '/', element: <DynamicIndex />, index: true},
{ path: '/blog', element: <DynamicBlogIndex />, index: true},
{ path: '/login', element: <DynamicLogin />, },
{ path: '/:id/user', element: <DynamicIdUser />, },
{ path: '/article/:id', element: <DynamicArticleId />, },
{ path: '/blog/:id', element: <DynamicBlogId />, },
{ path: '/settings/articles', element: <DynamicSettingsArticlesIndex />, index: true},
{ path: '/settings/domain', element: <DynamicSettingsDomainIndex />, index: true},
{ path: '*', element: <DynamicAll />, },]
    }
  ])
}

export const usePages = () => {
  const [pages, setPages] = React.useState([])

  React.useEffect(() => {
    Promise.all([import('./src/pages/index.tsx'),
import('./src/pages/blog/index.tsx'),
import('./src/pages/login.tsx'),
import('./src/pages/[id]/user.tsx'),
import('./src/pages/article/[id].tsx'),
import('./src/pages/blog/[id].tsx'),
import('./src/pages/settings/articles/index.tsx'),
import('./src/pages/settings/domain/index.tsx'),
import('./src/pages/[...all].tsx'),
]).then(res => {
      setPages([{ route: '/' },
{ route: '/blog', meta: res[1].meta },
{ route: '/login' },
{ route: '/:id/user' },
{ route: '/article/:id' },
{ route: '/blog/:id' },
{ route: '/settings/articles' },
{ route: '/settings/domain' },])
    })
  }, [])

  return pages
}