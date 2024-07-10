'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import axios from '../../../config'; // Adjust the import path for axios as needed
import Blog from '@/components/Blog';

const Category = () => {
  const params = useParams();
  const { name } = params; // Assuming [category_type] and [name] are dynamic segments
  const { categories } = useSelector((state) => state.categories);
  const [seo, setSeo] = useState([]);
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
        setSeo(response.data);
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

  return <>{selectCategory ? <Blog title={selectCategory.name} isHomepage={0} /> : <p>Category not found</p>}</>;
};

export default Category;
