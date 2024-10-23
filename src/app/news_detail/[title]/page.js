import BlogDetailsPage from '@/components/BlogDetailsPage';
import { BASE_URL, IMAGE_BASE_URL } from '@/config';
import { DEFAULT_FAVICON } from '@/config/constant';

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
    const imageUrl = metadata?.img ? `${IMAGE_BASE_URL}post/news-detail/${metadata.img}` : `${IMAGE_BASE_URL}post/news-detail/default-image.jpg`;

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
      icons: {
        icon: `${IMAGE_BASE_URL}setting/${DEFAULT_FAVICON}`,
      },
      openGraph: {
        title: metadata?.seo_title || 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
        description:
          metadata?.seo_description ||
          'ReadersMenu.com is #1 Growing Tamil News Portal | Get latest, breaking and exclusive news from Tamilnadu Politics, Cinema, Astrology, Medicine And Culture, Tamil newspaper, Tamil daily newspaper, Tamilnadu Temples, Tamilnadu news, Online Trending and viral news from Tamilnadu',
        keywords: metadata?.seo_keyword || 'ReadersMenu, tamil daily, tamil news, tamil jobs, latest news in tamil, latest jobs, astrology, art and culture',
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: metadata?.seo_title || 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
          },
        ],
        url: `${BASE_URL}/news-detail/${title}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: metadata?.seo_title || 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
        description:
          metadata?.seo_description ||
          'ReadersMenu.com is #1 Growing Tamil News Portal | Get latest, breaking and exclusive news from Tamilnadu Politics, Cinema, Astrology, Medicine And Culture, Tamil newspaper, Tamil daily newspaper, Tamilnadu Temples, Tamilnadu news, Online Trending and viral news from Tamilnadu',
        images: [
          {
            url: imageUrl,
            alt: metadata?.seo_title || 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
          },
        ],
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
        images: [
          {
            url: `${IMAGE_BASE_URL}post/news-detail/default-image.jpg`,
            width: 800,
            height: 600,
            alt: 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
        description:
          'ReadersMenu.com is #1 Growing Tamil News Portal | Get latest, breaking and exclusive news from Tamilnadu Politics, Cinema, Astrology, Medicine And Culture, Tamil newspaper, Tamil daily newspaper, Tamilnadu Temples, Tamilnadu news, Online Trending and viral news from Tamilnadu',
        images: [
          {
            url: `${IMAGE_BASE_URL}post/news-detail/default-image.jpg`,
            alt: 'Readers Menu: Latest News and Jobs in Tamil | Tamil News & Jobs Online',
          },
        ],
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
