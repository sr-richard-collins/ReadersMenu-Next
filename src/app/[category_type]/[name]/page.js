import Blog from '@/components/Blog';
import Loader from '@/components/Loader';
import { notFound } from 'next/navigation';
import { BASE_URL } from '@/config';

export async function generateStaticParams() {
  try {
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

export const dynamicParams = {
  fallback: 'blocking',
};

export async function generateMetadata({ params }) {
  const { category_type, name } = params;
  try {
    const response = await fetch(`http://tnreaders.in/api/user/seoCategory?id=${name}`);
    const metadata = await response.json();

    return {
      title: metadata?.seo_title || 'Default Title',
      description: metadata?.seo_description || 'Default Description',
      alternates: {
        canonical: `${BASE_URL}/${category_type}/${name}`,
        generator: 'ReadersMenu',
        applicationName: 'ReadersMenu',
        referrer: 'origin-when-cross-origin',
        authors: [{ name: 'ReadersMenu', url: 'https://www.readersmenu.com/' }],
      },
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

  if (!name) {
    return <Loader />;
  }

  const categories = await fetchCategories();
  const selectCategory = findCategory(categories, name);

  if (!selectCategory) {
    return notFound(); // Automatically handle 404 for not found pages
  }

  return (
    <>
      <Blog title={selectCategory.name} isHomepage={0} />
    </>
  );
}

// Use ISR to revalidate the page every 60 seconds
export const revalidate = 0;
