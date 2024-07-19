'use client';

import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { IMAGE_BASE_URL, DEFAULT_POST } from '../../config';
import { AuthContext } from '../../provider/AuthContext';
import axios from '../../config';

const RelatedPostsComponent = ({ posts }) => {
  const context = useContext(AuthContext);
  const { user } = context;
  const [clickedBlogArticleIconId, setClickedBlogArticleIconId] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        if (user) {
          const likesResponse = await axios.get(`/api/user/getLikesByUser?id=${user.id}`);
          setClickedBlogArticleIconId(likesResponse.data.likes);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchLikes();
  }, [user]);

  const handleBlogArticleHeartClick = async (linkId) => {
    if (!user) router.push('/login');
    else {
      try {
        await axios.post('/api/user/updateLikes', {
          userId: user.id,
          postId: linkId,
        });
        if (clickedBlogArticleIconId.includes(linkId)) {
          setClickedBlogArticleIconId(clickedBlogArticleIconId.filter((id) => id !== linkId));
        } else {
          setClickedBlogArticleIconId([...clickedBlogArticleIconId, linkId]);
        }
      } catch (error) {
        console.error('Error updating likes', error);
      }
    }
  };

  const handleFacebookShare = (slug, title, img, subTitle) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/' + slug)}&title=${encodeURIComponent(
        title
      )}&description=${encodeURIComponent(subTitle)}&picture=${encodeURIComponent(img)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleTwitterShare = (slug, title, img, subTitle) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/' + slug)}&text=${encodeURIComponent(
        title
      )}&image=${encodeURIComponent(img)}&description=${encodeURIComponent(subTitle)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleWhatsAppShare = (slug, title, img, subTitle) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${subTitle}\n${window.location.origin}/${slug}\n${img}`)}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <section className='today-post-area pt-50'>
      <div className='section-title-wrap'>
        <div className='section-title section-title-four'>
          <h2 className='title'>Related Posts</h2>
          <div className='section-title-line'></div>
        </div>
      </div>
      <div className='today-post-wrap'>
        <div className='row gutter-40 justify-content-center'>
          {posts.map((post, index) => (
            <div className='col-lg-12 col-md-12' key={index}>
              <div className='banner-post-five banner-post-seven'>
                <div className='banner-post-thumb-five'>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Link href={`/${post.category_type === 'news' ? 'news_detail' : 'article_detail'}/${post.seo_slug}`}>
                      <img
                        src={
                          post.img
                            ? IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + post.img
                            : IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + DEFAULT_POST
                        }
                        alt={post.title}
                      />
                    </Link>
                    <Link href={`/${post.category_type}/${post.category_data_query}`} className='post-tag my-3'>
                      {post.category_name}
                    </Link>
                  </div>
                </div>
                <div className='banner-post-content-five' style={{ borderBottom: '1px solid #e4e4e4' }}>
                  <h2 className='post-title'>
                    <Link href={`/${post.category_type === 'news' ? 'news_detail' : 'article_detail'}/${post.seo_slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.sub_title.length > 250 ? `${post.sub_title.slice(0, 250)}...` : post.sub_title}</p>
                  <div className='blog-post-meta'>
                    <ul className='list-wrap my-3'>
                      <li className='col-3 '>
                        <FontAwesomeIcon icon={faCalendar} />
                        {new Date(post.created_at).toLocaleDateString()}
                      </li>
                      <li className='col-3'>
                        <span className='homeblog-link-icon-phone'>
                          <a
                            onClick={() =>
                              handleWhatsAppShare(
                                post.seo_slug,
                                post.title,
                                post.img
                                  ? IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + post.img
                                  : IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + DEFAULT_POST,
                                post.sub_title
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faPhone} />
                          </a>
                        </span>
                        <span className='homeblog-link-icon-facebook'>
                          <a
                            onClick={() =>
                              handleFacebookShare(
                                post.seo_slug,
                                post.title,
                                post.img
                                  ? IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + post.img
                                  : IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + DEFAULT_POST,
                                post.sub_title
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faFacebookF} />
                          </a>
                        </span>
                        <span className='homeblog-link-icon-twitter'>
                          <a
                            onClick={() =>
                              handleTwitterShare(
                                post.seo_slug,
                                post.title,
                                post.img
                                  ? IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + post.img
                                  : IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + DEFAULT_POST,
                                post.sub_title
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faTwitter} />
                          </a>
                        </span>
                      </li>
                      <li className='col-6 '>
                        <div className='col-80'>
                          <div className='view-all-btn'>
                            <Link href={`/${post.category_type === 'news' ? 'news_detail' : 'article_detail'}/${post.seo_slug}`} className='homeblog-link-btn'>
                              Read More
                              <span className='svg-icon'>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'>
                                  <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                                  <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                                </svg>
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className='col-20'>
                          <button
                            onClick={() => handleBlogArticleHeartClick(post.id)}
                            className={clickedBlogArticleIconId.includes(post.id) ? 'blog-article-icon-heart-clicked' : ''}
                            style={{ background: 'none', border: 'none' }}
                          >
                            <FontAwesomeIcon icon={clickedBlogArticleIconId.includes(post.id) ? faHeart : farHeart} className='blog-article-icon-heart' />
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPostsComponent;
