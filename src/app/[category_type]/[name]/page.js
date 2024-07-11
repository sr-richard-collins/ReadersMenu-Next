'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import axios from '../../../config'; // Adjust the import path for axios as needed
import Blog from '@/components/Blog';
import Head from 'next/head';

const Category = () => {
  const params = useParams();
  const { name } = params; // Assuming [category_type] and [name] are dynamic segments
  const { categories } = useSelector((state) => state.categories);
  const [metadata, setMetadata] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);

  useEffect(() => {
    const findCategory = () => {
      if (!name) return null; // Handle case where name is undefined

      for (const category of categories) {
        if (category.data_query === name) {
          return category;
        }
        if (category.child) {
          const subCategory = category.child.find((subCategory) => subCategory.data_query === name);
          if (subCategory) {
            return subCategory;
          }
        }
      }
      return null;
    };

    setSelectCategory(findCategory());

    const fetchSeoData = async () => {
      try {
        const response = await axios.get(`/api/user/seoCategory?id=${name}`);
        setMetadata(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      }
    };

    if (name) {
      fetchSeoData();
    }
  }, [name, categories]);

  if (!name) {
    return <p>Loading...</p>; // Handle loading state while router.query.name is undefined
  }

  return (
    <>
      <Head>
        <title>{metadata?.seo_title || 'Default Title'}</title>
        <meta name='description' content={metadata?.seo_description || 'Default Description'} />
        <meta property='og:title' content={metadata?.seo_title || 'Default Title'} />
        <meta property='og:description' content={metadata?.seo_description || 'Default Description'} />
        <meta property='og:keywords' content={metadata?.seo_keyword || 'Default Keywords'} />
      </Head>
      {selectCategory ? <Blog title={selectCategory.name} isHomepage={0} /> : <p>Category not found</p>}
    </>
  );
};

export default Category;
