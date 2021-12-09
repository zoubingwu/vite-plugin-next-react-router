import React from 'react';
import { Link } from 'react-router-dom';

const index: React.FC = () => {
  return (
    <div>
      <p>this is login.tsx</p>
      <Link to="/">back home</Link>
    </div>
  );
};

export default index;
