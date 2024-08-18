import { BASE_URL } from '@/config';

async function fetchPosts() {
  try {
    const [responseArticle, responseNews, responseCategory] = await Promise.all([
      fetch('http://tnreaders.in/api/user/allArticlePostsSeo'),
      fetch('http://tnreaders.in/api/user/allNewsPostsSeo'),
      fetch('http://tnreaders.in/api/user/allCategories'),
    ]);

    if (!responseArticle.ok || !responseNews.ok || !responseCategory.ok) {
      throw new Error('Network response was not ok');
    }

    const articles = await responseArticle.json();
    const news = await responseNews.json();
    const categories = await responseCategory.json();

    return { articles, news, categories };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { articles: [], news: [] };
  }
}

export default async function sitemap() {
  const { articles, news, categories } = await fetchPosts();

  const articleUrls = articles.map((post) => ({
    url: `${BASE_URL}/article-detail/${post.seo_slug}`, // Use post.seo_slug for unique URL
    lastModified: post.updated_at,
  }));

  const newsUrls = news.map((post) => ({
    url: `${BASE_URL}/news-detail/${post.seo_slug}`, // Use post.seo_slug for unique URL
    lastModified: post.updated_at,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${BASE_URL}/${category.type2}/${category.data_query}`, // Use category.type2 and category.data_query
    lastModified: category.updated_at,
  }));

  return [...articleUrls, ...newsUrls, ...categoryUrls];
}
