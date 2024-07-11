import BlogDetailComponent from '@/components/blogdetail/BlogDetailComponent';
import RelatedPostsComponent from '@/components/blogdetail/RelatedPostsComponent';
import Breadcrumb from '@/components/Breadcrumb';
import Loader from '@/components/Loader';
import Head from 'next/head';
import CommentComponent from '@/components/blogdetail/CommentComponent';

export async function generateStaticParams() {
  try {
    // Fetch posts data
    const response = await fetch(`http://tnreaders.in/api/user/allPostsSeo`);
    const posts = await response.json();

    return posts.map((post) => {
      // console.log(post.seo_slug);
      return { title: post.seo_slug };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { title } = params;
  try {
    console.log(title);
    const response = await fetch(`http://tnreaders.in/api/user/seoPost?id=${title.toString()}`);
    const metadata = await response.json();
    console.log(response);
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
    // Fetch post data
    const postResponse = await fetch(`http://tnreaders.in/api/user/findPost?id=${title}`);
    const post = await postResponse.json();

    // Fetch related posts
    const relatedRes = await fetch(`http://tnreaders.in/api/user/relatedPost?id=${title}`);
    const relatedPosts = await relatedRes.json();
    // console.log(relatedPosts.length);

    // Fetch SEO metadata
    // const metaResponse = await fetch(`http://tnreaders.in/api/user/seoPost?id=${post.id}`);
    // const metadata = await metaResponse.json();

    return { post, relatedPosts };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { post: null, relatedPosts: [] };
  }
};

export default async function BlogDetails({ params }) {
  const { title } = params;

  // Ensure data is fetched before rendering
  if (!title) {
    return <Loader />;
  }

  const { post, relatedPosts } = await fetchData(title);

  return (
    <>
      <div className='spotlight-post-area pb-60'>
        <Breadcrumb title={decodeURIComponent(title)} />
        <div className='spotlight-post-inner-wrap'>
          <div className='col-lg-9 col-md-12 mt-20'>
            {post && <BlogDetailComponent post={post} />}
            <CommentComponent post={post} />
            {relatedPosts.length > 0 && <RelatedPostsComponent posts={relatedPosts} />}
          </div>
          <div className='col-lg-3'></div>
        </div>
      </div>
    </>
  );
}
