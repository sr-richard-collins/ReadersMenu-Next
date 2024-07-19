import { BASE_URL } from '@/config';

export async function generateSitemaps() {
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

export default async function sitemap({ category_type, name }) {
  const response = await fetch('http://tnreaders.in/api/user/allCategories');
  const categories = await response.json();
  return categories.map((post) => ({
    url: `${BASE_URL}/${category_type}/${name}`,
    lastModified: post.updated_at,
  }));
}
