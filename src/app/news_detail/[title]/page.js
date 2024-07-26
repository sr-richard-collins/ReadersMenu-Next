import BlogDetailsPage from '@/components/BlogDetailsPage';
import { BASE_URL } from '@/config';

export async function generateStaticParams() {
  try {
    const response = await fetch('http://tnreaders.in/api/user/allNewsPostsSeo');
    const posts = await response.json();

    return posts.map((post) => ({
      title: post.seo_slug || 'defaultNewsDetail',
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export const dynamicParams = {
  fallback: 'blocking',
};

export async function generateMetadata({ params }) {
  const { title } = params;

  try {
    const response = await fetch(`http://tnreaders.in/api/user/seoPost?id=${title}`);
    const metadata = await response.json();
    return {
      title: metadata?.seo_title || 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
      description:
        metadata?.seo_description ||
        'ReadersMenu.com is #1 Growing Tamil News Portal | Get latest, breaking and exclusive news from Tamilnadu Politics, Cinema, Astrology, Medicine And Culture, Tamil newspaper, Tamil daily newspaper, Tamilnadu Temples, Tamilnadu news, Online Trending and viral news from Tamilnadu',
      alternates: {
        canonical: `${BASE_URL}/news-detail/${title}`,
        generator: 'ReadersMenu',
        applicationName: 'ReadersMenu',
        referrer: 'origin-when-cross-origin',
        authors: [{ name: 'ReadersMenu', url: 'https://www.readersmenu.com/' }],
      },
      openGraph: {
        title: metadata?.seo_title || 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
        description:
          metadata?.seo_description ||
          'ReadersMenu.com is #1 Growing Tamil News Portal | Get latest, breaking and exclusive news from Tamilnadu Politics, Cinema, Astrology, Medicine And Culture, Tamil newspaper, Tamil daily newspaper, Tamilnadu Temples, Tamilnadu news, Online Trending and viral news from Tamilnadu',
        keywords: metadata?.seo_keyword || 'ReadersMenu, tamil daily, tamil news, tamil jobs, latest news in tamil, latest jobs, astrology, art and culture',
      },
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
      description:
        'ReadersMenu.com is #1 Growing Tamil News Portal | Get latest, breaking and exclusive news from Tamilnadu Politics, Cinema, Astrology, Medicine And Culture, Tamil newspaper, Tamil daily newspaper, Tamilnadu Temples, Tamilnadu news, Online Trending and viral news from Tamilnadu',
      openGraph: {
        title: 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
        description:
          'ReadersMenu.com is #1 Growing Tamil News Portal | Get latest, breaking and exclusive news from Tamilnadu Politics, Cinema, Astrology, Medicine And Culture, Tamil newspaper, Tamil daily newspaper, Tamilnadu Temples, Tamilnadu news, Online Trending and viral news from Tamilnadu',
        keywords: 'ReadersMenu, tamil daily, tamil news, tamil jobs, latest news in tamil, latest jobs, astrology, art and culture',
      },
    };
  }
}

const BlogDetails = ({ params }) => {
  const { title } = params;

  if (!title) {
    return <Loader />;
  }

  return <BlogDetailsPage title={title} />;
};

// Use ISR to revalidate the page every 60 seconds
export const revalidate = 0;

export default BlogDetails;
