import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import ThankYou from './ThankYou';
import Home from './Home';
import NotFound from './NotFound';

import { AnimatePresence } from 'framer-motion';

function App() {
  const element = useRoutes([
    {
      path: '',
      element: <Home />
    },
    {
      path: '/thank-you',
      element: <ThankYou />
    },
    {
      path: '*',
      element: <NotFound />
    },
  ]);

  const location = useLocation();

  if (!element) return null;
  return (
    <AnimatePresence>
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}
export default App;
