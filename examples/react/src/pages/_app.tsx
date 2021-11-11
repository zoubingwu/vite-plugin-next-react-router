import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Footer from '../components/Footer';

const Layout: React.FC = ({ children }) => {
  const match = useRouteMatch('/blog/:id');
  console.log('match: ', match);

  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
