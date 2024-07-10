import React from 'react';
import Link from 'next/link';

const SubCategoryBreadcrumb = ({ subCategories, title }) => {
  return (
    <>
      <div className='breadcrumb-area'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='breadcrumb-content'>
              <nav aria-label='breadcrumb'>
                <div className='sidebar-social-wrap'>
                  <ul className='list-wrap breadcrumb-item breadcrumb'>
                    {subCategories.map((subCategory) => (
                      <li key={subCategory.id}>
                        <Link href={`/${subCategory.type2}/${subCategory.data_query}`} className={subCategory.name === title ? 'active' : ''}>
                          <span>{subCategory.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryBreadcrumb;
