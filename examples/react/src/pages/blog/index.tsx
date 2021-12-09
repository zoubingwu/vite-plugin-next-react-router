import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const index: React.FC = () => {
  return (
    <div>
      <p>this is blog/index.tsx</p>
      <ul>
        <li>
          <Link to="/blog/this-is-blog-a">Blog A</Link>
        </li>
        <li>
          <Link to="/blog/this-is-blog-b">Blog B</Link>
        </li>
        <li>
          <Link to="/blog/this-is-blog-c">Blog C</Link>
        </li>
        <li>
          <Link to="/blog/this-is-blog-d">Blog D</Link>
        </li>
      </ul>

      <hr />

      <Outlet />
    </div>
  );
};

export const meta = {
  title: 'blog index',
  icon: <div>blog icon</div>,
};

export default index;
