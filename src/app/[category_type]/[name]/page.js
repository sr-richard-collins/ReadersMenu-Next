import Blog from '@/components/Blog';
import { use } from 'react';
import Head from 'next/head';

export async function generateStaticParams() {
  try {
    // Fetch categories data
    const response = await fetch('http://tnreaders.in/api/user/allCategories');
    const categories = await response.json();

    return categories.map((post) => ({
      category_type: post.type2,
      name: post.data_query,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { name } = params;
  try {
    const response = await fetch(`http://tnreaders.in/api/user/seoCategory?id=${name}`);
    const metadata = await response.json();

    return {
      title: metadata?.seo_title || 'Default Title',
      description: metadata?.seo_description || 'Default Description',
      openGraph: {
        title: metadata?.seo_title || 'Default Title',
        description: metadata?.seo_description || 'Default Description',
        keywords: metadata?.seo_keyword || 'Default Keywords',
      },
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'Default Title',
      description: 'Default Description',
      openGraph: {
        title: 'Default Title',
        description: 'Default Description',
        keywords: 'Default Keywords',
      },
    };
  }
}

async function fetchCategories() {
  try {
    const response = await fetch('http://tnreaders.in/api/user/categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

function findCategory(categories, name) {
  if (!name || !categories) return null;

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
}

export default async function Category({ params }) {
  const { name } = params;

  // Fetch categories and metadata
  const categories = await fetchCategories();
  const selectCategory = findCategory(categories, name);

  if (!name) {
    return <p>Loading...</p>;
  }

  return <>{selectCategory ? <Blog title={selectCategory.name} isHomepage={0} /> : <p>Category not found</p>}</>;
}
