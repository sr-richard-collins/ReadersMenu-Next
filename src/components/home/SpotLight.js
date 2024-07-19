'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoPost from '../../views/error/No_post';
import axios from '../../config';
import { IMAGE_BASE_URL, DEFAULT_POST } from '../../config';
import { fetchSelectCategory } from '../../actions/categoryAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
// import 'bootstrap'; // Import Bootstrap JavaScript
import Link from 'next/link';
import { AuthContext } from '../../provider/AuthContext';
import { useRouter } from 'next/navigation';

const SpotLightSection = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const [spotlight, setSpotlight] = useState([]);
  const [clickedBlogArticleIconId, setClickedBlogArticleIconId] = useState([]);
  const [noPost, setNoPost] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const resSpotlight = await axios.get(`/api/user/spotlight`);
        setSpotlight(resSpotlight.data);

        if (user) {
          const likesResponse = await axios.get(`/api/user/getLikesByUser`, {
            params: { id: user.id },
          });
          setClickedBlogArticleIconId(likesResponse.data.likes);
        }

        setNoPost(1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrendingPosts();
  }, []);

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  };

  const handleFacebookShare = (slug, type) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.origin + '/' + (type === 'news' ? 'news_detail' : 'article_detail') + '/' + slug
      )}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleTwitterShare = (slug, type) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.origin + '/' + (type === 'news' ? 'news_detail' : 'article_detail') + '/' + slug
      )}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleWhatsAppShare = (slug, type) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(
        window.location.origin + '/' + (type === 'news' ? 'news_detail' : 'article_detail') + '/' + slug
      )}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleBlogArticleHeartClick = (linkId) => {
    if (!user) router.push('/login');
    else {
      const fetchLikes = async () => {
        const response = await axios.post('/api/user/updateLikes', {
          userId: user.id,
          postId: linkId,
        });
      };
      fetchLikes();
      if (clickedBlogArticleIconId.includes(linkId)) {
        setClickedBlogArticleIconId(clickedBlogArticleIconId.filter((id) => id !== linkId));
      } else {
        setClickedBlogArticleIconId([...clickedBlogArticleIconId, linkId]);
      }
    }
  };

  return (
    <>
      {spotlight.length ? (
        <div className='spotlight-post-item-wrap'>
          <div className='section-title-wrap-three mb-20'>
            <div className='section-title-three'>
              <h6 className='title'>
                தலைப்புச் செய்திகள்
                <span className='section-title-svg'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 246 40' fill='none' preserveAspectRatio='none'>
                    <path
                      d='M10.1448 2.85061C10.6524 1.15867 12.2097 0 13.9761 0H241.624C244.303 0 246.225 2.58294 245.455 5.14939L235.855 37.1494C235.348 38.8413 233.79 40 232.024 40H4.37612C1.69667 40 -0.225117 37.4171 0.544817 34.8506L10.1448 2.85061Z'
                      fill='currentcolor'
                    />
                  </svg>
                </span>
              </h6>
              <div className='section-title-line-three'></div>
            </div>
            <div className='view-all-btn mb-4'>
              <Link href={`/${spotlight[0].category_type}/${spotlight[0].category_data_query}`} className='link-btn'>
                View All
                <span className='svg-icon'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'>
                    <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                    <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          {spotlight.map((item, index) => (
            <div className='row' key={index}>
              <div className='spotlight-post big-post'>
                <div className='spotlight-post-thumb'>
                  <Link href={`/${item.category_type === 'news' ? 'news_detail' : 'article_detail'}/${item.seo_slug}`}>
                    <img
                      src={
                        item.img
                          ? IMAGE_BASE_URL + 'post/' + (item.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + item.img
                          : IMAGE_BASE_URL + 'post/' + (item.category.type2 === 'news' ? 'news_detail' : 'article_detail') + '/' + DEFAULT_POST
                      }
                      alt={item.title}
                    />
                  </Link>
                  <Link
                    href={`/${item.category_type}/${item.category_data_query}`}
                    className='post-tag'
                    onClick={() => handleViewClick(item.category_name)}
                    style={{ fontWeight: 'bold', marginTop: '20px' }}
                  >
                    {item.category_name}
                  </Link>
                </div>
              </div>
              <div className='weekly-post-content mb-4' style={{ borderBottom: '1px solid #e4e4e4' }}>
                <h2 className='post-title'>
                  <Link href={`/${item.category_type === 'news' ? 'news_detail' : 'article_detail'}/${item.seo_slug}`}>{item.title}</Link>
                </h2>
                <p>{item.sub_title.length > 250 ? `${item.sub_title.slice(0, 250)}...` : item.sub_title}</p>
                <div className='blog-post-meta'>
                  <ul className='list-wrap mb-3'>
                    <li className='col-3'>
                      <FontAwesomeIcon icon={faCalendar} />
                      {new Date(item.created_at).toLocaleDateString()}
                    </li>
                    <li className='col-3'>
                      <span className='homeblog-link-icon-phone'>
                        <a onClick={() => handleWhatsAppShare(item.seo_slug, item.category.type2)}>
                          <FontAwesomeIcon icon={faPhone} />
                        </a>
                      </span>
                      <span className='homeblog-link-icon-facebook'>
                        <a onClick={() => handleFacebookShare(item.seo_slug, item.category.type2)}>
                          <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                      </span>
                      <span className='homeblog-link-icon-twitter'>
                        <a onClick={() => handleTwitterShare(item.seo_slug, item.category.type2)}>
                          <FontAwesomeIcon icon={faTwitter} />
                        </a>
                      </span>
                    </li>
                    <li className='col-6'>
                      <div className='view-all-btn col-80'>
                        <Link href={`/${item.category_type === 'news' ? 'news_detail' : 'article_detail'}/${item.seo_slug}`} className='homeblog-link-btn'>
                          Read More
                          <span className='svg-icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'>
                              <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                              <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                            </svg>
                          </span>
                        </Link>
                      </div>
                      {/* <div className='col-20'>
                        <a
                          onClick={() => handleBlogArticleHeartClick(item.id)}
                          className={clickedBlogArticleIconId.includes(item.id) ? 'blog-article-icon-heart-clicked' : ''}
                        >
                          <FontAwesomeIcon icon={clickedBlogArticleIconId.includes(item.id) ? faHeart : farHeart} className='blog-article-icon-heart' />
                        </a>
                      </div> */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <div className='view-all-btn my-2 d-flex justify-content-center'>
            <Link href={`/${spotlight[0].category_type}/${spotlight[0].category_data_query}`} className='link-btn'>
              View All
              <span className='svg-icon'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'>
                  <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                  <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      ) : noPost === 0 ? (
        ''
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default SpotLightSection;
