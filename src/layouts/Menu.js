'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectCategory, fetchCategories } from '../actions/categoryAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight, faMoneyCheck } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import { DEFAULT_CATEGORY, IMAGE_BASE_URL } from '../config';
import Link from 'next/link';

const Menu = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const { categories, selectCategory } = useSelector((state) => state.categories);

  const [activeLink, setActiveLink] = useState('home');
  const [showDropleft, setShowDropleft] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [mainCategories, setMainCategories] = useState([]);
  const [moreCategories, setMoreCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

  const handleLinkClick = useCallback(
    (link) => {
      setActiveLink(link);
      dispatch(fetchSelectCategory(link));
    },
    [dispatch]
  );

  const handleCategoryClick = useCallback((categoryName) => {
    setActiveCategory((prevCategory) => (prevCategory === categoryName ? null : categoryName));
  }, []);

  const handleCategoryMouseEnter = useCallback((categoryName) => {
    setActiveCategory(categoryName);
  }, []);

  const handleCategoryMouseLeave = useCallback(() => {
    setActiveCategory(null);
  }, []);

  const handleSubMenuLeave = useCallback(() => {
    setShowDropleft(false);
    setActiveCategory(null);
  });

  const handleLinkMouseEnter = useCallback((category) => {
    if (!category.child) {
      setActiveCategory(null);
    }
  }, []);

  const getCurrentDate = () => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  if (mainCategories.length > 7) setMoreCategories([...moreCategories, ...mainCategories.slice(7)]);

  return (
    <>
      <div className='left-sub-menu'>
        <div className='row left-menu-content'>
          <ul className='dropdown-content mb-10'>
            <li className={(selectCategory ? selectCategory : activeLink) === 'home' ? 'active' : ''}>
              <Link href='/' onClick={() => handleLinkClick('home')} className='nav-bar-link'>
                <FontAwesomeIcon icon={faHome} className='img-icon-left-menu rounded-circle mx-2' />
                Home
              </Link>
            </li>
            {mainCategories.map((category) => (
              <li key={category.id} className={(selectCategory ? selectCategory : activeLink) === category.name ? 'active' : ''}>
                {!category.child ? (
                  <Link
                    href={`/${category.type2}/${category.data_query}`}
                    onClick={() => handleLinkClick(category.name)}
                    className='nav-bar-link'
                    onMouseEnter={() => handleLinkMouseEnter(category)}
                  >
                    <img
                      className='img-icon-left-menu rounded-circle mx-2'
                      src={
                        category.image
                          ? IMAGE_BASE_URL + 'category/' + category.type2 + '/' + category.image
                          : IMAGE_BASE_URL + 'category/' + category.type2 + '/' + DEFAULT_CATEGORY
                      }
                    />
                    {category.name}
                  </Link>
                ) : (
                  <div className='category-link-with-dropdown' onMouseLeave={handleCategoryMouseLeave} onClick={() => handleCategoryClick(category.name)}>
                    <Link
                      href={`/${category.type2}/${category.data_query}`}
                      onMouseEnter={() => handleCategoryMouseEnter(category.name)}
                      className='nav-bar-link'
                    >
                      <div className='col-95'>
                        <img
                          className='img-icon-left-menu rounded-circle mx-2'
                          src={
                            category.image
                              ? IMAGE_BASE_URL + 'category/' + category.type2 + '/' + category.image
                              : IMAGE_BASE_URL + 'category/' + category.type2 + '/' + DEFAULT_CATEGORY
                          }
                        />
                        {category.name}
                      </div>
                      <div className='col-05'>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </div>
                    </Link>
                    {activeCategory === category.name && (
                      <ul className='left-menu-dropleft sub-category dropdown-content show-dropleft' onMouseLeave={handleCategoryMouseLeave}>
                        {category.child.map((subCategory) => (
                          <li
                            key={subCategory.id}
                            className={(selectCategory ? selectCategory : activeLink) === subCategory.name ? 'active' : ''}
                            onMouseOver={(e) => e.currentTarget.classList.add('hovered')}
                            onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                          >
                            <Link
                              href={`/${subCategory.type2}/${subCategory.data_query}`}
                              onClick={() => handleLinkClick(subCategory.name)}
                              onMouseEnter={() => setActiveLink(subCategory.name)}
                            >
                              {subCategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
            {moreCategories.length > 0 && (
              <li className='' onMouseLeave={handleSubMenuLeave} style={{ height: '48px' }}>
                <Link href='#' onMouseEnter={() => setShowDropleft(true)} className='nav-bar-link mb-2'>
                  <div className='col-95 d-flex align-items-center'>
                    <FontAwesomeIcon icon={faMoneyCheck} className='img-icon-left-menu mx-2' />
                    <span>View More</span>
                  </div>
                  <div className='col-05'>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </Link>
                <ul className={`left-menu-dropleft view-more dropdown-content ${showDropleft ? 'show-dropleft' : ''}`}>
                  {moreCategories.map((category) => (
                    <li className={(selectCategory ? selectCategory : activeLink) === category.name ? 'active' : ''} key={category.id}>
                      {!category.child ? (
                        <Link
                          href={`/${category.type2}/${category.data_query}`}
                          onClick={() => handleLinkClick(category.name)}
                          className='nav-bar-link'
                          onMouseEnter={() => handleLinkMouseEnter(category)}
                        >
                          {category.name}
                        </Link>
                      ) : (
                        <div className='category-link-with-moredropdown'>
                          <Link
                            href={`/${category.type2}/${category.data_query}`}
                            onMouseEnter={() => handleCategoryMouseEnter(category.name)}
                            className='nav-bar-link'
                          >
                            {category.name}
                            <FontAwesomeIcon icon={faChevronRight} className='mx-2' />
                          </Link>
                          {activeCategory === category.name && (
                            <ul className='left-menu-dropleft sports-sub-category dropdown-content show-dropleft' onMouseLeave={handleCategoryMouseLeave}>
                              {category.child.map((moreSubCategory) => (
                                <li
                                  className={(selectCategory ? selectCategory : activeLink) === moreSubCategory.name ? 'active' : ''}
                                  key={moreSubCategory.id}
                                  onMouseOver={(e) => e.currentTarget.classList.add('hovered')}
                                  onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                                >
                                  <Link
                                    href={`/${moreSubCategory.type2}/${moreSubCategory.data_query}`}
                                    onClick={() => handleLinkClick(moreSubCategory.name)}
                                    onMouseEnter={() => setActiveLink(moreSubCategory.name)}
                                  >
                                    {moreSubCategory.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
