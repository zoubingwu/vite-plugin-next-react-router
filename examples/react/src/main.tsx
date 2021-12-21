import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import './index.css';
import { usePageRoutes, usePages } from 'virtual:next-react-router';

function App() {
  const pages = usePages();
  console.log('pages: ', pages);

  const routes = usePageRoutes();
  console.log('routes: ', routes);
  const element = useRoutes(routes);
  return element;
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
