import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Footer from '../components/Footer';

export default function Layout({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<any>;
  pageProps: any;
}) {
  const match = useRouteMatch('/blog/:id');
  console.log('match: ', match);

  return (
    <div>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
