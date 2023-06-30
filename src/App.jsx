import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header';

import ProductDetails from './components/Products/ProductDetails';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Auth from './components/Auth/Form';

const App = () => {
  const { pathname } = useLocation();
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);
    return null;
  };
  const Token = Boolean(useSelector((state) => state.Token));
  console.log(pathname);
  return (
    <>
      <ScrollToTop />
      {Token && <Header />}

      <Routes>
        {pathname === '/' && (
          <Route path="/" element={Token ? <Home /> : <Auth />} />
        )}
        <Route
          path="product/:productid"
          element={Token ? <ProductDetails /> : <Auth />}
        />
      </Routes>
    </>
  );
};

export default App;
