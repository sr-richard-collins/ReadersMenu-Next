import { BASE_URL } from '@/config';

export async function generateSitemaps() {
  try {
    const response = await fetch('http://tnreaders.in/api/user/allNewsPostsSeo');
    const posts = await response.json();

    return posts.map((post) => ({
      title: post.seo_slug,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function sitemap({ title }) {
  const response = await fetch('http://tnreaders.in/api/user/allNewsPostsSeo');
  const posts = await response.json();
  return posts.map((post) => ({
    url: `${BASE_URL}/article_detail/${title}`,
    lastModified: post.updated_at,
  }));
}
