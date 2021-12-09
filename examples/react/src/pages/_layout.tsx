import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Layout: React.FC = () => {
  return (
    <div>
      <Suspense fallback={'loading...'}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Layout;
