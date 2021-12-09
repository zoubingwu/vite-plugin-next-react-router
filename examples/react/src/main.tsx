import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import './index.css';
import { routes, pages } from 'virtual:next-react-router';

console.log('pages: ', pages);

console.log('routes: ', routes);

function App() {
  const element = useRoutes(routes);
  return element;
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
