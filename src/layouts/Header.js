import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectCategory } from '../actions/categoryAction';
import { fetchCategories } from '../actions/categoryAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMAGE_BASE_URL } from '../config';
import googleplayimg from '../assets/img/icon/googleplay.png';
import { AuthContext } from '../provider/AuthContext';
import { SOCIAL_FB, SOCIAL_TWITTER, SOCIAL_INSTA, SOCIAL_LINKEDIN, SOCIAL_YOUTUBE, DEFAULT_LOGO } from '../config/constant';

const Header = () => {
  const context = useContext(AuthContext);
  const { user, logout } = context;

  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const { categories, selectCategory } = useSelector((state) => state.categories);
  const [activeLink, setActiveLink] = useState('home');
  const [showToggleSubMenu, setShowToggleSubMenu] = useState(false);
  const [showToggleSubCategory, setShowToggleSubCategory] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState({ category: null, show: false });
  const [mainCategories, setMainCategories] = useState([]);
  const [moreCategories, setMoreCategories] = useState([]);

  useEffect(() => {
    const main = categories.filter((category) => category.position === 'main');
    const more = categories.filter((category) => category.position === 'more');

    if (main.length > 7) {
      setMoreCategories([...more, ...main.slice(7)]);
      setMainCategories(main.slice(0, 7));
    } else {
      setMainCategories(main);
      setMoreCategories(more);
    }
  }, [categories]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    dispatch(fetchSelectCategory(link));
    setShowToggleMenu(false);
    setShowToggleSubMenu(false);
    setActiveCategory({ category: null, show: false });
  };

  const handleMenuToggleOpenClick = () => {
    setShowToggleMenu((prevShowToggleMenu) => !prevShowToggleMenu);
  };
  const handleMenuToggleCloseClick = () => {
    setShowToggleMenu(false);
    setShowToggleSubMenu(false);
    setActiveCategory({ category: null, show: false });
  };

  const handleShowToggleSubMenu = () => {
    setShowToggleSubMenu(!showToggleSubMenu);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('#mobileMenuToggleBtn')) {
        setShowToggleMenu(false);
        setShowToggleSubMenu(false);
        setActiveCategory({ category: null, show: false });
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <header className='header-style-six'>
      <div className='header-top-wrap-four'>
        <div className='row align-items-center'>
          <div className='col-lg-3 col-md-3 col-4'>
            <div className='header-top-left-four'>
              <div className='swiper-container ta-trending-slider'>
                <div className='myswiper-wrapper'>
                  <div className='swiper-slide'>
                    <Link to='/'>
                      <img src={setting.site_logo !== undefined ? IMAGE_BASE_URL + setting.site_logo : DEFAULT_LOGO} alt='logo' className='mylogo-style' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-md-3 col-1'></div>
          <div className='col-lg-6 col-md-6 col-7' style={{ alignItems: 'end' }}>
            <div className='header-top-social header-top-social-two'>
              <ul className='list-wrap'>
                <li className='social-icons'>
                  <span>
                    <Link to={setting.social_fb ? setting.social_fb : SOCIAL_FB} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                    </Link>
                  </span>
                </li>
                <li className='social-icons'>
                  <span>
                    <Link to={setting.social_twitter ? setting.social_twitter : SOCIAL_TWITTER} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-twitter' />
                    </Link>
                  </span>
                </li>
                <li className='social-icons'>
                  <span>
                    <Link to={setting.social_insta ? setting.social_insta : SOCIAL_INSTA} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-instagram' />
                    </Link>
                  </span>
                </li>
                <li className='social-icons'>
                  <span>
                    <Link to={setting.social_linkedin ? setting.social_linkedin : SOCIAL_LINKEDIN} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-linkedin' />
                    </Link>
                  </span>
                </li>
                <li className='social-icons'>
                  <span>
                    <Link to={setting.social_youtube ? setting.social_youtube : SOCIAL_YOUTUBE} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-youtube' />
                    </Link>
                  </span>
                </li>

                {user ? (
                  <>
                    <span>{user.name}</span>
                    <button onClick={logout} className='btn'>
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to='/login' className='btn'>
                      Log In
                    </Link>
                    <Link to='/register' className='btn'>
                      Register
                    </Link>
                  </>
                )}
              </ul>
            </div>
            <div className='mobile-nav-toggler'>
              {user ? (
                <>
                  <span>{user.name}</span>
                  <button onClick={logout} className='btn'>
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to='/login' className='btn mx-1'>
                    Log In
                  </Link>
                  <Link to='/register' className='btn mx-1'>
                    Register
                  </Link>
                </>
              )}
              <Link to='#' onClick={handleMenuToggleOpenClick} className='nav-bar-link mx-1' id='mobileMenuToggleBtn'>
                <FontAwesomeIcon icon='fas fa-bars' />
              </Link>
            </div>
            {showToggleMenu && (
              <div ref={mobileMenuRef} className='mobile-menu' onMouseLeave={handleMenuToggleCloseClick}>
                <nav className='menu-box'>
                  <div className='menu-outer'>
                    <ul className='navigation'>
                      <li>
                        <div className='close-btn' onClick={handleMenuToggleCloseClick}>
                          <FontAwesomeIcon icon='fas fa-times' />
                        </div>
                        <Link to='/'>
                          <img src={setting.site_logo !== undefined ? IMAGE_BASE_URL + setting.site_logo : DEFAULT_LOGO} alt='logo' style={{ width: '70%' }} />
                        </Link>
                      </li>
                      <li className={(selectCategory ? selectCategory : activeLink) === 'home' ? 'active' : ''}>
                        <Link to='/' onClick={() => handleLinkClick('home')} className='nav-bar-link mx-3'>
                          Home
                        </Link>
                      </li>

                      {mainCategories.map((category, index) => (
                        <li className={(selectCategory ? selectCategory : activeLink) === category.name ? 'active' : ''} key={index}>
                          {!category.child ? (
                            <Link to={`/news/${category.data_query}`} onClick={() => handleLinkClick(category.name)} className='nav-bar-link' key={category.id}>
                              {category.name}
                            </Link>
                          ) : (
                            <>
                              <Link
                                onClick={() => {
                                  setActiveCategory((prevActiveCategory) => ({
                                    category: category.name,
                                    show: prevActiveCategory.category !== category.name ? true : !prevActiveCategory.show,
                                  }));
                                }}
                                className='nav-bar-link'
                              >
                                <div className='d-flex mx-3'>
                                  <div className='col-95'>{category.name}</div>
                                  <div className='col-05'>
                                    <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                                  </div>
                                </div>
                              </Link>
                              {activeCategory.category === category.name && (
                                <ul className='sub-menu' style={{ display: activeCategory.show ? 'block' : 'none' }}>
                                  {category.child.map((subCategory) => (
                                    <li key={subCategory.id} className={activeLink === subCategory.name ? 'active' : ''}>
                                      <Link
                                        key={subCategory.id}
                                        to={`/news/${subCategory.data_query}`}
                                        onClick={() => handleLinkClick(subCategory.name)}
                                        className='nav-bar-link ml-5'
                                      >
                                        {subCategory.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleShowToggleSubMenu} className='nav-bar-link'>
                          <div className='mx-3  d-flex'>
                            <div className='col-95'>View More</div>
                            <div className='col-05'>
                              <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                            </div>
                          </div>
                        </Link>
                        <ul className='sub-menu' style={{ display: 'block' }}>
                          {showToggleSubMenu &&
                            moreCategories.map((category, index) => (
                              <li className={`${(selectCategory ? selectCategory : activeLink) === category.name ? 'active ' : ''
                                } mx-3`} key={index}>
                                {!category.child ? (
                                  <Link to={`/news/${category.data_query}`} onClick={() => handleLinkClick(category.name)} className='nav-bar-link' key={category.id}>
                                    {category.name}
                                  </Link>
                                ) : (
                                  <>
                                    <Link
                                      onClick={() => {
                                        setActiveCategory((prevActiveCategory) => ({
                                          category: category.name,
                                          show: prevActiveCategory.category !== category.name ? true : !prevActiveCategory.show,
                                        }));
                                      }}
                                      className='nav-bar-link'
                                    >
                                      <div className='d-flex'>
                                        <div className='col-95' style={{fontSize:'12px'}}>{category.name}</div>
                                        <div className='col-05'>
                                          <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                                        </div>
                                      </div>
                                    </Link>
                                    {activeCategory.category === category.name && (
                                      <ul className='sub-menu' style={{ display: activeCategory.show ? 'block' : 'none' }}>
                                        {category.child.map((subCategory) => (
                                          <li key={subCategory.id} className={activeLink === subCategory.name ? 'active' : ''}>
                                            <Link
                                              key={subCategory.id}
                                              to={`/news/${subCategory.data_query}`}
                                              onClick={() => handleLinkClick(subCategory.name)}
                                              className='nav-bar-link ml-5'
                                              
                                            >
                                              {subCategory.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </>
                                )}
                              </li>
                            ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className='row left-menu-store my-2'>
                    <div className='left-menu-social mb-10'>
                      <ul className='list-wrap row justify-content-center'>
                        <li className='social-icons col'>
                          <span>
                            <Link to={setting.social_fb ? setting.social_fb : SOCIAL_FB} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                            </Link>
                          </span>
                        </li>
                        <li className='social-icons col'>
                          <span>
                            <Link to={setting.social_twitter ? setting.social_twitter : SOCIAL_TWITTER} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-twitter' />
                            </Link>
                          </span>
                        </li>
                        <li className='social-icons col'>
                          <span>
                            <Link to={setting.social_insta ? setting.social_insta : SOCIAL_INSTA} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-instagram' />
                            </Link>
                          </span>
                        </li>
                        <li className='social-icons col'>
                          <span>
                            <Link to={setting.social_linkedin ? setting.social_linkedin : SOCIAL_LINKEDIN} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-linkedin' />
                            </Link>
                          </span>
                        </li>
                        <li className='social-icons col'>
                          <span>
                            <Link to={setting.social_youtube ? setting.social_youtube : SOCIAL_YOUTUBE} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-youtube' />
                            </Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
