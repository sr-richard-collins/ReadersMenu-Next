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
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query);

      const handler = () => setMatches(mediaQuery.matches);

      // Initial check
      handler();

      // Listen for changes in the media query
      mediaQuery.addListener(handler);

      return () => {
        mediaQuery.removeListener(handler);
      };
    }
  }, [query]);

  return matches;
};

const RootLayout = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 767.98px)');

  const handleTopScreen = () => {
    if (typeof window !== 'undefined') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error scrolling to the top:', error);
      }
    } else {
      console.warn('Window object is not available.');
    }
  };

  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>
            <button className='scroll-top scroll-to-target' onClick={() => handleTopScreen()}>
              <FontAwesomeIcon icon={faAngleUp} />
            </button>
            {/* Include the header */}
            <Header />
            <section className='pt-70 pb-60'>
              <Menu />

              <main className='fix' style={{ marginLeft: isMobile ? '0px' : '285px' }}>
                {children}
              </main>

            </section>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
