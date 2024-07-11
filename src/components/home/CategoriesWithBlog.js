'use client';
import React, { useState, useEffect } from 'react';
import HomeBlog from '../HomeBlog';
import axios from '../../config';
import Loader from '../Loader';

const CategoriesWithBlogSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const resCategory = await axios.get('/api/user/homePagecategories');
        setCategories(resCategory.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='spotlight-post-item-wrap'>
      {categories.length ? categories.map((category) => <HomeBlog title={category.name} key={category.id} />) : ''}
    </div>
  );
};

export default CategoriesWithBlogSection;
