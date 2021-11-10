import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

const component: React.FC<RouteConfigComponentProps> = ({ route }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/blog">blogs</Link>
        </li>
        <li>
          <Link to="/article/4">article</Link>
        </li>
        <li>
          <Link to="/4/user">user</Link>
        </li>
        <li>
          <Link to="/404">404</Link>
        </li>
      </ul>
    </div>
  );
};

export default component;
