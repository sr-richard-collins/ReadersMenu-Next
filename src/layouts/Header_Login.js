import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectCategory } from '../actions/categoryAction';
import { fetchCategories } from '../actions/categoryAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMAGE_BASE_URL } from '../config';
import { SOCIAL_FB, SOCIAL_TWITTER, SOCIAL_INSTA, SOCIAL_LINKEDIN, SOCIAL_YOUTUBE, DEFAULT_LOGO } from '../config/constant';
import googleplayimg from '../assets/img/icon/googleplay.png';
import { AuthContext } from '../provider/AuthContext';

const HeaderLogin = () => {
  const context = useContext(AuthContext);
  const { user, logout } = context;

  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const { categories, selectCategory } = useSelector((state) => state.categories);
  const [activeLink, setActiveLink] = useState('home');
  const [showToggleSubMenu, setShowToggleSubMenu] = useState(false);
  const [showToggleSubCategory, setShowToggleSubCategory] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  // const [activeCategory, setActiveCategory] = useState([[null, false],]);
  const [activeCategory, setActiveCategory] = useState({ category: null, show: false });
  const moreCategories = categories.filter((category) => category.position === 'more');
  const mainCategories = categories.filter((category) => category.position === 'main');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    dispatch(fetchSelectCategory(link));
    // setShowToggleSubMenu(false);
    setShowToggleMenu(false);
  };

  const handleMenuToggleOpenClick = () => {
    setShowToggleMenu(!showToggleMenu);
  };
  const handleMenuToggleCloseClick = () => {
    setShowToggleMenu(false);
  };

  const handleShowToggleSubMenu = () => {
    // debugger;
    setShowToggleSubMenu(!showToggleSubMenu);
  };

  return (
    <header className='header-style-six'>
      <div className='header-top-wrap-four'>
        <div className='row align-items-center'>
          <div className='col-3'>
            <div className='header-top-left-four'>
              <div className='swiper-container ta-trending-slider'>
                <div className='swiper-wrapper'>
                  <div className='swiper-slide'>
                    <Link to='/'>
                      <img src={setting.site_logo !== undefined ? IMAGE_BASE_URL + setting.site_logo : DEFAULT_LOGO} alt='logo' className='logo-style' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-3'></div>
          <div className='col-6' style={{ alignItems: 'end' }}>
            <div className='header-top-social header-top-social-two'>
              <ul className='list-wrap'>
                <li>
                  <span>
                    <Link to='/'>
                      <FontAwesomeIcon icon='fa-solid fa-house' className='img-icon-left-menu rounded-circle mx-2' />
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
            <div className='mobile-nav-toggler'>
              <Link to='#' onClick={handleMenuToggleOpenClick} className='nav-bar-link'>
                <FontAwesomeIcon icon='fas fa-bars' />
              </Link>
            </div>
            {showToggleMenu && (
              <div className='mobile-menu' onMouseLeave={handleMenuToggleCloseClick}>
                <nav className='menu-box'>
                  <div className='menu-outer'>
                    <ul className='navigation'>
                      <li>
                        <div className='close-btn' onClick={handleMenuToggleCloseClick}>
                          <FontAwesomeIcon icon='fas fa-times' />
                        </div>
                        <Link to='/'>
                          <img src={setting.site_logo !== undefined ? IMAGE_BASE_URL + setting.site_logo : DEFAULT_LOGO} alt='logo' />
                        </Link>
                      </li>
                      <li className={(selectCategory ? selectCategory : activeLink) === 'home' ? 'active' : ''}>
                        <Link to='/' onClick={() => handleLinkClick('home')} className='nav-bar-link'>
                          Home
                        </Link>
                      </li>

                      {mainCategories.map((category, index) => (
                        <li className={(selectCategory ? selectCategory : activeLink) === category.name ? 'active' : ''} key={index}>
                          {!category.child ? (
                            <Link
                              to={`/${category.type2}/${category.data_query}`}
                              onClick={() => handleLinkClick(category.name)}
                              className='nav-bar-link'
                              key={category.id}
                            >
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
                                {category.name} <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                              </Link>
                              {activeCategory.category === category.name && (
                                <ul className='sub-menu' style={{ display: activeCategory.show ? 'block' : 'none' }}>
                                  {category.child.map((subCategory) => (
                                    <li key={subCategory.id} className={activeLink === subCategory.name ? 'active' : ''}>
                                      <Link
                                        key={subCategory.id}
                                        to={`/${subCategory.type2}/${subCategory.data_query}`}
                                        onClick={() => handleLinkClick(subCategory.name)}
                                        className='nav-bar-link'
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
                          View More <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                        </Link>
                        <ul className='sub-menu' style={{ display: 'block' }}>
                          {showToggleSubMenu &&
                            moreCategories.map((category) => (
                              <li key={category.id} className={activeLink === category.name ? 'active' : ''}>
                                <Link onClick={() => handleLinkClick(category.name)} className='nav-bar-link'>
                                  {category.name} <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className='row left-menu-store'>
                    <Link to='https://play.google.com/store/' className='my-2'>
                      {' '}
                      <img src={googleplayimg} />{' '}
                    </Link>
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
                  <div className='row'>
                    <span className='mt-2 left-menu-footer mb-10'>
                      {' '}
                      <Link to={'/about'}>About Us &middot; </Link>
                      <Link to={'/about'}>Privacy Policy</Link>
                    </span>
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

export default HeaderLogin;
