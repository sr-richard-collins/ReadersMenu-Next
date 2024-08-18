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
    const fetchPostAndRelatedPosts = async () => {
      setLoading(true);
      try {
        const [postResponse, relatedResponse] = await Promise.all([
          axios.get(`/api/user/findPost`, { params: { id: title } }),
          axios.get(`/api/user/relatedPost`, { params: { id: title } }),
        ]);

        setPost(postResponse.data);
        setRelatedPosts(relatedResponse.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    fetchPostAndRelatedPosts();
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
