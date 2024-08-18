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


  const handleFacebookShare = (slug, title, img, subTitle, type) => {
    if (typeof window !== 'undefined') {
      const imgUrl = `https://tnreaders.in/images/post/${type === 'news' ? 'news-detail' : 'article-detail'}/${img}`;
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(
        title
      )}&description=${encodeURIComponent(subTitle)}&picture=${encodeURIComponent(imgUrl)}`;
      window.open(shareUrl, '_blank');
    }
  };


  const handleTwitterShare = (slug, title, img, subTitle, type) => {
    if (typeof window !== 'undefined') {
      const imgUrl = `https://tnreaders.in/images/post/${type === 'news' ? 'news-detail' : 'article-detail'}/${img}`;
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(
        title
      )}&image=${encodeURIComponent(imgUrl)}&description=${encodeURIComponent(subTitle)}`;
      window.open(shareUrl, '_blank');
    }
  };


  const handleTelegramShare = (slug, title, img, subTitle, type) => {
    if (typeof window !== 'undefined') {
      const imgUrl = `https://tnreaders.in/images/post/${type === 'news' ? 'news-detail' : 'article-detail'}/${img}`;
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(
        `${title}\n\n${subTitle}\n\n${imgUrl}`
      )}`;
      window.open(shareUrl, '_blank');
    }
  };


  const handleWhatsAppShare = (slug, title, img, subTitle, type) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(
        `${title}\n${subTitle}\n${window.location.href}\nhttps://tnreaders.in/images/post/${type === 'news' ? 'news-detail' : 'article-detail'}/${img}`
      )}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <section className='blog-details-area pt-20 pb-60 col-lg-12 col-md-12 col-12'>
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
                        <Link href='#' onClick={() => handleFacebookShare(post.seo_slug, post.title, post.img, post.sub_title, post.category.type2)}>
                          <FontAwesomeIcon icon={faFacebookF} />
                        </Link>
                      </li>
                      <li>
                        <Link href='#' onClick={() => handleTwitterShare(post.seo_slug, post.title, post.img, post.sub_title, post.category.type2)}>
                          <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                      </li>
                      <li>
                        <Link href='#' onClick={() => handleTelegramShare(post.seo_slug, post.title, post.img, post.sub_title, post.category.type2)}>
                          <FontAwesomeIcon icon={faTelegram} />
                        </Link>
                      </li>
                      <li>
                        <Link href='#' onClick={() => handleWhatsAppShare(post.seo_slug, post.title, post.img, post.sub_title, post.category.type2)}>
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
                          ? IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news-detail' : 'article-detail') + '/' + post.img
                          : IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news-detail' : 'article-detail') + '/' + DEFAULT_POST
                      }
                      alt={post.seo_slug}
                    />
                  </Link>
                  <Link
                    href={`/${post.category.type2}/${post.category.data_query}`}
                    className='post-tag mb-3'
                    style={{ fontWeight: 'bold', marginTop: '20px' }}
                  >
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
