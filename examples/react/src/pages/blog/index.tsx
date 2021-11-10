import React from 'react';
import { Link } from 'react-router-dom';

const index: React.FC = () => {
  return (
    <div>
      <p>this is blog/index.tsx</p>
      <Link to="/blog/123123">first blog</Link>
    </div>
  );
};

//@ts-ignore
index.getLayout = function getLayout(page) {
  return (
    <div>
      {page}
      <footer>this is another per page footer</footer>
    </div>
  );
};

export default index;
