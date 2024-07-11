'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from '../config';

const Breadcrumb = ({ title }) => {
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [postTitle, setPostTitle] = useState('');
  useEffect(() => {
    const checkTitle = async () => {
      const response = await axios.post('/api/user/checkBreadcrumb', { title });
      setCategoryName(response.data.category);
      setSubCategoryName(response.data.subCategory);
      setPostTitle(response.data.post);
    };
    checkTitle();
  }, [title]);
  return (
    <>
      <div className='breadcrumb-area'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='breadcrumb-content'>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link href='/'>
                      Home
                      <span>
                        {' '}
                        <FontAwesomeIcon icon={faAngleRight} />
                      </span>
                    </Link>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    {categoryName}
                  </li>
                  {subCategoryName && (
                    <li className='breadcrumb-item active' aria-current='page'>
                      <FontAwesomeIcon icon={faAngleRight} />
                      {subCategoryName}
                    </li>
                  )}
                  {postTitle && (
                    <li className='breadcrumb-item active' aria-current='page'>
                      <FontAwesomeIcon icon={faAngleRight} />
                      {postTitle}
                    </li>
                  )}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
