import React, { useState, useEffect } from 'react';
import BlogDetailComponent from '../components/BlogDetailComponent';
import RelatedPostsComponent from '../components/RelatedPostsComponent';
import Breadcrumb from '../components/Breadcrumb';
import { useParams } from 'react-router-dom';
import axios from '../config/';
import Loader from '../components/Loader';
import Menu from '../layouts/Menu';
import CommentComponent from '../components/CommentComponent';

const BlogsDetails = () => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { title } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/api/user/findPost?id=${title}`);
      const relatedRes = await axios.get(`/api/user/relatedPost?id=${title}`);
      setPost(response.data);
      setRelatedPosts(relatedRes.data);
      setLoading(false);
    };
    fetch();

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

export default BlogsDetails;
