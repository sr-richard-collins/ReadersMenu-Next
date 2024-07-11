// import { useEffect } from 'react';
'use client';
import React, { useState, useEffect } from 'react';
import ReduxProvider from '../redux/ReduxProvider';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../provider/AuthContext';
import Menu from '@/layouts/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Header from '@/layouts/Header';
import axios from '../config';

const inter = Inter({ subsets: ['latin'] });

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

const RootLayout = ({ children }) => {
  // const { setting } = useSelector((state) => state.setting);
  const isMobile = useMediaQuery('(max-width: 767.98px)');

  const handleTopScreen = () => {
    window.scrollTo(0, 0);
  };

  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>
            <button className='scroll-top scroll-to-target' onClick={() => handleTopScreen()}>
              <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <Header />
            <section className='pt-70 pb-60 '>
              <Menu />
              {isMobile ? (
                <main className='fix'>
                  {children}
                </main>
              ) : (
                <main className='fix' style={{ marginLeft: '285px' }}>
                  {children}
                </main>
              )}
            </section>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
