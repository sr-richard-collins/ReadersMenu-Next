'use client';
import React, { useEffect, useState } from 'react';
import SpotLightSection from '../components/home/SpotLight';
import CategoriesWithBlogSection from '../components/home/CategoriesWithBlog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePosts } from '../actions/postAction';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [message, setMessage] = useState(router.query?.message || '');

  useEffect(() => {
    dispatch(fetchHomePosts()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000); // 2 seconds delay

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) return <Loader />;

  return (
    <>
      {message && <div className='alert success-message'>{message}</div>}
      <div>
        <section className='spotlight-post-area pt-20 pb-60'>
          <div className='spotlight-post-inner-wrap'>
            <div className='row justify-content-center'>
              <div className='col-lg-9 col-md-12 col-12'>
                <SpotLightSection />
                <CategoriesWithBlogSection />
              </div>
              <div className='col-lg-3'></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
