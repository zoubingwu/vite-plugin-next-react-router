import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import { routes, GlobalLayout } from 'virtual:next-react-router';

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalLayout>
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={lazy(route.component)}
            />
          ))}
        </Switch>
      </GlobalLayout>
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);
