import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
// import { Container } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handler = () => setMatches(mediaQuery.matches);

    // Initial check
    handler();

    // Listen for changes in the media query
    mediaQuery.addListener(handler);

    return () => {
      mediaQuery.removeListener(handler);
    };
  }, [query]);

  return matches;
};

const FullLayout = () => {
  const isMobile = useMediaQuery('(max-width: 767.98px)');

  const handleTopScreen = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <button className='scroll-top scroll-to-target' onClick={() => handleTopScreen()}>
        <FontAwesomeIcon icon='fa-solid fa-angle-up' />
      </button>
      <div className='container'>
        <Header />
        <section className='pt-70 pb-60 '>
          <Menu />
          {isMobile ? (
            <main className='fix'>
              <Outlet />
            </main>
          ) : (
            <main className='fix' style={{ marginLeft: '285px' }}>
              <Outlet />
            </main>
          )}
        </section>
      </div>
    </>
  );
};

export default FullLayout;
