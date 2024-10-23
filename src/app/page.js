'use client';

import React, { useEffect, useState } from 'react';
import SpotLightSection from '../components/home/SpotLight';
import CategoriesWithBlogSection from '../components/home/CategoriesWithBlog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePosts } from '../actions/postAction';
import Loader from '@/components/Loader';
import Head from 'next/head';
import Footer from '@/layouts/Footer';
import axios from '../config';
import { useRouter } from 'next/navigation';
import { IMAGE_BASE_URL } from '../config';
import { DEFAULT_FAVICON } from '@/config/constant';

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [metadataLoading, setMetadataLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);
  const router = useRouter();

  const [message, setMessage] = useState(router.query?.message || '');

  useEffect(() => {
    dispatch(fetchHomePosts()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await axios.get('/api/user/setting');
        setMetadata(res.data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setMetadataLoading(false);
      }
    };
    fetchMetadata();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000); // 2 seconds delay

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading || metadataLoading) return <Loader />;

  return (
    <>
      <Head>{<link rel='icon' href={`${IMAGE_BASE_URL}setting/${DEFAULT_FAVICON}`} type='image/png' />}</Head>
      {message && <div className='alert success-message'>{message}</div>}

      <div className='col-lg-9 col-md-12 col-12'>
        <section className='spotlight-post-area pt-20 pb-60'>
          <div className='spotlight-post-inner-wrap'>
            <div className='row justify-content-center'>
              <div className='col-lg-12 col-md-12 col-12'>
                <SpotLightSection />
                <CategoriesWithBlogSection />
                <Footer />
              </div>
              {/* <div className="col-lg-3"></div> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
