'use client';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IMAGE_BASE_URL, DEFAULT_POST } from '../../config';

const BlogDetailComponent = ({ post }) => {
  const renderMetaInfo = () => {
    if (!post) return null;

    return (
      <ul className='list-wrap'>
        <li style={{ fontSize: '15px' }}>
          <FontAwesomeIcon icon={faCalendar} />
          {new Date(post.created_at).toLocaleDateString()}
        </li>
      </ul>
    );
  };

  const handleFacebookShare = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleTwitterShare = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleTelegramShare = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleWhatsappShare = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
      window.open(shareUrl, '_blank');
    }
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
                  <div className='blog-post-meta'>{renderMetaInfo()}</div>
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
                    <img
                      src={
                        post.img
                          ? IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + post.img
                          : IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + DEFAULT_POST
                      }
                      alt={post.seo_slug}
                    />
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
