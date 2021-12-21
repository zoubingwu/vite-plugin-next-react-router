interface GenerateAsyncCodeParams {
  layoutImport: string;
  dynamicPageImports: string;
  routes: string;
  dynamicImports: string;
  pages: string;
  layoutElement: string;
}

export const generateAsyncCode = ({
  layoutImport,
  dynamicPageImports,
  routes,
  dynamicImports,
  pages,
  layoutElement,
}: GenerateAsyncCodeParams) => `
import React from 'react';
import { Outlet } from 'react-router-dom';
${layoutImport}

function DefaultLayout() {
  return (
    <React.Suspense fallback={null}>
      <Outlet />
    </React.Suspense>
  )
}

export const usePageRoutes = () => {
  ${dynamicPageImports}

  return React.useMemo(() => [
    {
      path: '/',
      element: ${layoutElement},
      children: [${routes}]
    }
  ], [])
}

export const usePages = () => {
  const [pages, setPages] = React.useState([])

  React.useEffect(() => {
    Promise.all([${dynamicImports}]).then(res => {
      setPages([${pages}])
    })
  }, [])

  return pages
}
`;

interface GenerateSyncCodeParams {
  layoutImport: string;
  staticPageImports: string;
  layoutElement: string;
  routes: string;
  pages: string;
}

export const generateSyncCode = ({
  layoutImport,
  staticPageImports,
  layoutElement,
  routes,
  pages,
}: GenerateSyncCodeParams) => `
import React from 'react';
import { Outlet } from 'react-router-dom';
${layoutImport}
${staticPageImports}

export const usePageRoutes = () => {
  return React.useMemo(() => [
    {
      path: '/',
      element: ${layoutElement},
      children: [
        ${routes}
      ]
    }
  ], [])
}

export const usePages = () => {
  return React.useMemo(() => [
    ${pages}
  ], [])
}
`;
