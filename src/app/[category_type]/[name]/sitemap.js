import { BASE_URL } from '@/config';

async function fetchCategories() {
  try {
    const response = await fetch('http://tnreaders.in/api/user/allCategories');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// export async function generateSitemaps() {
//   const categories = await fetchCategories();
//   return categories.map((category) => ({
//     category_type: category.type2,
//     name: category.data_query,
//   }));
// }

export default async function sitemap() {
  const categories = await fetchCategories();
  return categories.map((category) => ({
    url: `${BASE_URL}/${category.type2}/${category.data_query}`, // Use category.type2 and category.data_query
    lastModified: category.updated_at,
  }));
}
