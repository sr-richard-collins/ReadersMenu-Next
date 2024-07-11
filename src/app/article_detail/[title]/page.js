'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BlogDetailComponent from '@/components/blogdetail/BlogDetailComponent';
import RelatedPostsComponent from '@/components/blogdetail/RelatedPostsComponent';
import Breadcrumb from '@/components/Breadcrumb';
import axios from '../../../config';
import Loader from '@/components/Loader';
import Head from 'next/head';
import CommentComponent from '@/components/blogdetail/CommentComponent';

const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);

  const { title } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/api/user/findPost?id=${title}`);
      const relatedRes = await axios.get(`/api/user/relatedPost?id=${title}`);
      setPost(response.data);
      setRelatedPosts(relatedRes.data);
      setLoading(false);
    };
    if (title) fetch();

    const fetchSeoData = async () => {
      try {
        const response = await axios.get(`/api/user/seoPost?id=${post.id}`);
        setMetadata(response.data);
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      }
    };

    if (title) {
      fetchSeoData();
    }
    window.scrollTo(0, 0);
  }, [title]);

  if (loading) return <Loader />;
  return (
    <>
      <Head>
        <title>{metadata?.seo_title || 'Default Title'}</title>
        <meta name='description' content={metadata?.seo_description || 'Default Description'} />
        <meta property='og:title' content={metadata?.seo_title || 'Default Title'} />
        <meta property='og:description' content={metadata?.seo_description || 'Default Description'} />
        <meta property='og:keywords' content={metadata?.seo_keyword || 'Default Keywords'} />
      </Head>
      <div className='spotlight-post-area pb-60'>
        <Breadcrumb title={decodeURIComponent(title)} />
        <div className='spotlight-post-inner-wrap'>
          <div className='col-lg-9 col-md-12 mt-20'>
            {post && <BlogDetailComponent post={post} />}
            <CommentComponent post={post} />
            {relatedPosts.length > 0 && <RelatedPostsComponent posts={relatedPosts} />}
          </div>
          <div className='col-lg-3'></div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
