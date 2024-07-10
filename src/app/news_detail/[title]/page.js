'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BlogDetailComponent from '@/components/blogdetail/BlogDetailComponent';
import RelatedPostsComponent from '@/components/blogdetail/RelatedPostsComponent';
import Breadcrumb from '@/components/Breadcrumb';
import axios from '../../../config';
import Loader from '@/components/Loader';
import CommentComponent from '@/components/blogdetail/CommentComponent';

const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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

    window.scrollTo(0, 0);
  }, [title]);

  if (loading) return <Loader />;
  return (
    <>
      <div className='spotlight-post-area pb-60'>
        <Breadcrumb title={title} />
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
