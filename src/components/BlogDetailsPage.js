'use client';
import { useState, useEffect } from 'react';
import BlogDetailComponent from '@/components/blogdetail/BlogDetailComponent';
import RelatedPostsComponent from '@/components/blogdetail/RelatedPostsComponent';
import Breadcrumb from '@/components/Breadcrumb';
import Loader from '@/components/Loader';
// import { notFound } from 'next/navigation';
import axios from '../config/index';

const fetchData = async (title) => {
  try {
    const postResponse = await axios.get(`/api/user/findPost?id=${title}`);
    const post = await postResponse.data;

    const relatedRes = await axios.get(`/api/user/relatedPost?id=${title}`);
    const relatedPosts = await relatedRes.data;

    return { post, relatedPosts };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { post: null, relatedPosts: [] };
  }
};

const BlogDetailsPage = ({ title }) => {
  const [data, setData] = useState({ post: null, relatedPosts: [], loading: true });

  useEffect(() => {
    const getData = async () => {
      const { post, relatedPosts } = await fetchData(title);
      if (post) {
        setData({ post, relatedPosts, loading: false });
      } else {
        // notFound();
        <p>Not Found</p>;
      }
    };
    getData();
  }, [title]);

  if (data.loading) {
    return <Loader />;
  }

  return (
    <>
      <div className='spotlight-post-area pb-60'>
        <Breadcrumb title={decodeURIComponent(title)} />
        <div className='spotlight-post-inner-wrap'>
          <div className='col-lg-9 col-md-12 mt-20'>
            <BlogDetailComponent post={data.post} />
            {data.relatedPosts.length > 0 && <RelatedPostsComponent posts={data.relatedPosts} />}
          </div>
          <div className='col-lg-3'></div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
