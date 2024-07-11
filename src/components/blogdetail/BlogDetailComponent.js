'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IMAGE_BASE_URL, DEFAULT_POST } from '../../config';
import axios from '../../config';
import { useSelector } from 'react-redux';

const BlogDetailComponent = ({ post }) => {
  const { setting } = useSelector((state) => state.setting);
  const [seo, setSeo] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/api/user/seoPost?id=${post.id}`);
      setSeo(response.data);
    };
    fetch();
  }, [post]);

  const handleFacebookShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleTelegramShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleWhatsappShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <section className='blog-details-area pt-20 pb-60'>
      <div className='author-inner-wrap'>
        <div className='row justify-content-center'>
          <div className='blog-details-wrap'>
            <div className='blog-details-content'>
              <div className='blog-details-content-top'>
                <h2 className='title'>{post.title}</h2>
                <div className='bd-content-inner'>
                  <div className='blog-post-meta'>
                    <ul className='list-wrap'>
                      <li style={{ fontSize: '15px' }}>
                        <FontAwesomeIcon icon={faCalendar} />
                        {new Date(post.created_at).toLocaleDateString()}
                      </li>
                    </ul>
                  </div>
                  <div className='blog-details-social'>
                    <ul className='list-wrap'>
                      <li>
                        <Link href='#' onClick={handleFacebookShare}>
                          <FontAwesomeIcon icon={faFacebookF} />
                        </Link>
                      </li>
                      <li>
                        <Link href='#' onClick={handleTwitterShare}>
                          <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                      </li>
                      <li>
                        <Link href='#' onClick={handleTelegramShare}>
                          <FontAwesomeIcon icon={faTelegram} />
                        </Link>
                      </li>
                      <li>
                        <Link href='#' onClick={handleWhatsappShare}>
                          <FontAwesomeIcon icon={faPhone} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='blog-details-thumb'>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Link href='#'>
                    <img src={post.img ? IMAGE_BASE_URL + post.img : IMAGE_BASE_URL + DEFAULT_POST} alt={post.seo_slug} />
                  </Link>
                  <Link href='#' className='post-tag mb-3' style={{ fontWeight: 'bold', marginTop: '20px' }}>
                    {post.category_name}
                  </Link>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.description }} style={{ textAlign: 'justify' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailComponent;
