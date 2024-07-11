import Blog from '@/components/Blog';
import Head from 'next/head';

export async function generateStaticParams() {
  try {
    // Fetch categories data
    const response = await fetch(`http://tnreaders.in/api/user/allCategories`);
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

export default async function Category({ params }) {
  const { name } = params;

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

  async function fetchSeoData(name) {
    try {
      const response = await fetch(`http://tnreaders.in/api/user/seoCategory?id=${name}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      return {};
    }
  }

  // Fetch categories synchronously within the function
  const categoriesResponse = await fetch(`http://tnreaders.in/api/user/categories`);
  const categories = await categoriesResponse.json();

  const selectCategory = findCategory(categories, name);
  const metadata = await fetchSeoData(name);

  if (!name) {
    return <p>Loading...</p>;
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
}
