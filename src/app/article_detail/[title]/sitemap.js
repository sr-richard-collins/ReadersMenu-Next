import { BASE_URL } from '@/config';

async function fetchPosts() {
  try {
    const response = await fetch('http://tnreaders.in/api/user/allArticlePostsSeo');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// export async function generateSitemaps() {
//   const posts = await fetchPosts();
//   return posts.map((post) => ({
//     title: post.seo_slug,
//   }));
// }

export default async function sitemap() {
  const posts = await fetchPosts();
  return posts.map((post) => ({
    url: `${BASE_URL}/article_detail/${post.seo_slug}`, // Use post.seo_slug for unique URL
    lastModified: post.updated_at,
  }));
}
