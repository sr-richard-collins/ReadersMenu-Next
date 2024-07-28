'use client';
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IMAGE_BASE_URL, DEFAULT_POST } from '../config/index';
import { fetchSelectCategory } from '../actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../provider/AuthContext';
import { useRouter } from 'next/navigation';
import axios from '../config';
import Link from 'next/link';

const HomeBlog = ({ title }) => {
  const dispatch = useDispatch();
  const context = useContext(AuthContext);
  const { user } = context;
  const { homePosts } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { setting } = useSelector((state) => state.setting);
  const router = useRouter();
  const [clickedBlogArticleIconId, setClickedBlogArticleIconId] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Find the relevant post category from homePosts
        const response = homePosts.find((post) => post.category === title);
        if (response) {
          setPosts(response.posts);
        }

        // Fetch user likes if user is logged in
        if (user) {
          const likesResponse = await axios.get(`/api/user/getLikesByUser?id=${user.id}`);
          setClickedBlogArticleIconId(likesResponse.data.likes);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed (e.g., set error state)
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [title]);

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
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
    }
    if (clickedBlogArticleIconId.includes(linkId)) {
      setClickedBlogArticleIconId(clickedBlogArticleIconId.filter((id) => id !== linkId));
    } else {
      setClickedBlogArticleIconId([...clickedBlogArticleIconId, linkId]);
    }
  };

  const handleFacebookShare = (slug, title, img, subTitle, type) => {
    if (typeof window !== 'undefined') {
      const imgUrl = `https://tnreaders.in/images/post/${type === 'news' ? 'news-detail' : 'article-detail'}/${img}`;
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/' + slug)}&title=${encodeURIComponent(
        title
      )}&description=${encodeURIComponent(subTitle)}&picture=${encodeURIComponent(imgUrl)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleTwitterShare = (slug, title, img, subTitle, type) => {
    if (typeof window !== 'undefined') {
      const imgUrl = `https://tnreaders.in/images/post/${type === 'news' ? 'news-detail' : 'article-detail'}/${img}`;
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/' + slug)}&text=${encodeURIComponent(
        title
      )}&image=${encodeURIComponent(imgUrl)}&description=${encodeURIComponent(subTitle)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleWhatsAppShare = (slug, title, img, subTitle, type) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(
        `${title}\n${subTitle}\n${window.location.origin}/${type === 'news' ? 'news-detail' : 'article-detail'}/${slug}\nhttps://tnreaders.in/images/post/${
          type === 'news' ? 'news-detail' : 'article-detail'
        }/${img}`
      )}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <>
      {posts.length ? (
        <div className='spotlight-post-item-wrap'>
          <div className='section-title-wrap-three mb-20'>
            <div className='section-title-three'>
              <h6 className='title'>
                {posts[0].category.name}
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
              <Link
                href={`/${posts[0].category_type === 'news' ? 'news' : 'article'}/${posts[0].category.data_query}`}
                className='link-btn'
                onClick={() => handleViewClick('spotlight')}
              >
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
          {[...Array(Math.ceil(posts.length / 1))].map((_, index) => (
            <>
              {posts.slice(index * 1, index * 1 + 1 < posts.length ? index * 1 + 1 : posts.length).map((post) => (
                <div className='row' key={post.id}>
                  <div className='spotlight-post big-post'>
                    <div className='spotlight-post-thumb'>
                      <Link href={`/${post.category_type === 'news' ? 'news-detail' : 'article-detail'}/${post.seo_slug}`}>
                        <img
                          src={
                            post.img
                              ? IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news-detail' : 'article-detail') + '/' + post.img
                              : IMAGE_BASE_URL + 'post/' + (post.category.type2 === 'news' ? 'news-detail' : 'article-detail') + '/' + DEFAULT_POST
                          }
                          alt={post.title}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className='weekly-post-content mb-4' style={{ borderBottom: '1px solid #e4e4e4' }}>
                    {/* <Link
                        href={`/${post.category_type}/${post.category_data_query}`}
                        className="post-tag"
                        onClick={() => handleViewClick(post.category_name)}
                        style={{ fontWeight: "bold", marginTop: "20px" }}
                      >
                        {post.category_name}
                      </Link> */}
                    <h2 className='post-title'>
                      <Link href={`/${post.category_type === 'news' ? 'news-detail' : 'article-detail'}/${post.seo_slug}`}>{post.title}</Link>
                    </h2>
                    <p>{post.sub_title.length > 250 ? `${post.sub_title.slice(0, 250)}...` : post.sub_title}</p>
                    <div className='blog-post-meta'>
                      <ul className='list-wrap mb-3'>
                        <li className='col-3'>
                          <FontAwesomeIcon icon={faCalendar} />
                          {new Date(post.created_at).toLocaleDateString()}
                        </li>
                        <li className='col-3'>
                          <span className='homeblog-link-icon-phone'>
                            <a onClick={() => handleWhatsAppShare(post.seo_slug, post.title, post.img, post.sub_title, post.category.type2)}>
                              <FontAwesomeIcon icon={faPhone} />
                            </a>
                          </span>
                          <span className='homeblog-link-icon-facebook'>
                            <a onClick={() => handleFacebookShare(post.seo_slug, post.title, post.img, post.sub_title, post.category.type2)}>
                              <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                          </span>
                          <span className='homeblog-link-icon-twitter'>
                            <a onClick={() => handleTwitterShare(post.seo_slug, post.title, post.img, post.sub_title, post.category.type2)}>
                              <FontAwesomeIcon icon={faTwitter} />
                            </a>
                          </span>
                        </li>
                        <li className='col-6'>
                          <div className='view-all-btn col-80'>
                            <Link href={`/${post.category_type === 'news' ? 'news-detail' : 'article-detail'}/${post.seo_slug}`} className='homeblog-link-btn'>
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
            </>
          ))}
          <div className='view-all-btn my-2 d-flex justify-content-center'>
            <Link href={`/${posts[0].category_type === 'news' ? 'news' : 'article'}/${posts[0].category.data_query}`} className='link-btn'>
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
      ) : (
        ''
      )}
    </>
  );
};

export default HomeBlog;
