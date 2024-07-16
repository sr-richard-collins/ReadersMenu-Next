import BlogDetailComponent from '@/components/blogdetail/BlogDetailComponent';
import RelatedPostsComponent from '@/components/blogdetail/RelatedPostsComponent';
import Breadcrumb from '@/components/Breadcrumb';
import Loader from '@/components/Loader';
import CommentComponent from '@/components/blogdetail/CommentComponent';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const response = await fetch('http://tnreaders.in/api/user/allNewsPostsSeo');
    const posts = await response.json();

    return posts.map((post) => ({
      title: post.seo_slug,
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

const fetchData = async (title) => {
  try {
    const postResponse = await fetch(`http://tnreaders.in/api/user/findPost?id=${title}`);
    const post = await postResponse.json();

    const relatedRes = await fetch(`http://tnreaders.in/api/user/relatedPost?id=${title}`);
    const relatedPosts = await relatedRes.json();

    return { post, relatedPosts };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { post: null, relatedPosts: [] };
  }
};

export default async function BlogDetails({ params }) {
  const { title } = params;

  if (!title) {
    return <Loader />;
  }

  const { post, relatedPosts } = await fetchData(title);

  if (!post) {
    return notFound(); // Automatically handle 404 for not found pages
  }

  return (
    <>
      <div className='spotlight-post-area pb-60'>
        <Breadcrumb title={decodeURIComponent(title)} />
        <div className='spotlight-post-inner-wrap'>
          <div className='col-lg-9 col-md-12 mt-20'>
            <BlogDetailComponent post={post} />
            <CommentComponent post={post} />
            {relatedPosts.length > 0 && <RelatedPostsComponent posts={relatedPosts} />}
          </div>
          <div className='col-lg-3'></div>
        </div>
      </div>
    </>
  );
}

// Use ISR to revalidate the page every 60 seconds
export const revalidate = 60;
