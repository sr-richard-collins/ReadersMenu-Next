'use client';

import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import axios from '../config';
import { IMAGE_BASE_URL, DEFAULT_POST } from '../config';
import CustomPagination from '../components/CustomPagination';
import Breadcrumb from '../components/Breadcrumb';
import SubCategoryBreadcrumb from './SubCategoryBreadCrumb';
import Loader from '../components/Loader';
import { fetchSelectCategory } from '../actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import NoPost from '../views/error/No_post';
import { AuthContext } from '@/provider/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/navigation';

const Blog = ({ title, isHomepage }) => {
  const dispatch = useDispatch();
  const { homePosts } = useSelector((state) => state.posts);
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState([]);
  const [clickedBlogArticleIconId, setClickedBlogArticleIconId] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        let response;
        if (isHomepage === 1) {
          response = homePosts.find((post) => post.category === title);
          if (response) {
            setPosts(response.posts);
          } else {
            setPosts([]);
          }
          setTotalPosts(response ? response.posts.length : 0);
        } else {
          response = await axios.get(`/api/user/pagenationPosts`, {
            params: {
              category: title,
              currentPage,
              postsPerPage,
            },
          });
          if (postsPerPage === 'all') {
            setPosts(response.data);
            setTotalPosts(response.data.length);
          } else {
            setPosts(response.data.data);
            setTotalPosts(response.data.total);
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    fetchPosts();
  }, [title, currentPage, postsPerPage]);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await axios.get(`/api/user/subcategory?id=${title}`);
        setSubCategory(response.data);

        if (user) {
          const likesResponse = await axios.get(`/api/user/getLikesByUser?id=${user.id}`);
          setClickedBlogArticleIconId(likesResponse.data.likes);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchSubCategory();
  }, [title]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setPostsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const handleBlogArticleHeartClick = (linkId) => {
    const router = useRouter();
    if (!user) router.push('/login');
    else {
      const fetchLikes = async () => {
        await axios.post('/api/user/updateLikes', {
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

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  };

  if (loading && isHomepage === 0) {
    return <Loader />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className='pb-60 col-lg-9 col-md-12 col-12'>
          {subCategory.length ? <SubCategoryBreadcrumb subCategories={subCategory} title={title} /> : ''}
          <Breadcrumb title={title} />
          {posts.length ? (
            posts.map((post) => (
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
            ))
          ) : (
            <NoPost />
          )}
          {isHomepage === 0 && (
            <>
              <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              <form className='form-inline ml-3'>
                <label htmlFor='per_page' className='mr-2'>
                  Show:
                </label>
                <select name='per_page' id='per_page' className='form-control' value={postsPerPage} onChange={handlePerPageChange}>
                  <option value='10'>10/page</option>
                  <option value='20'>20/page</option>
                  <option value='50'>50/page</option>
                  <option value='100'>100/page</option>
                  <option value='all'>All</option>
                </select>
              </form>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default Blog;
