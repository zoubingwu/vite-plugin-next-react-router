import { Route, Link, useParams } from 'react-router-dom';
import React from 'react';

const component: React.FC = () => {
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
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/404">404</Link>
        </li>
      </ul>
    </div>
  );
};

export default component;
