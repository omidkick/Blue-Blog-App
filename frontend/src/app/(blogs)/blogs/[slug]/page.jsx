import { getPostBySlug } from "@/services/postServices";
import Image from "next/image";
import { notFound } from "next/navigation";
import RelatedPost from "../_components/RelatedPost";
import PostComment from "../_components/comment/PostComment";
import BackButton from "@/ui/BackButton";

// export const dynamicParams = false;

// export async function generateStaticParams() {
//   const posts = await getPosts();

//   const slugs = posts.map((post) => ({ slug: post.slug }));
//   return slugs;
// }

// meta data for dynamic route

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: `پست ${post.title}`,
  };
}

async function SinglePost({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="text-secondary-600 max-w-screen-lg mx-auto px-4">
      <h1 className="text-secondary-700 text-2xl font-bold mb-8 flex flex-col md:flex-row  md:items-center gap-2 lg:gap-8">
        <BackButton arrowClassName="w-6 lg:w-7 lg:h-7 h-6" />
        {post.title}
      </h1>
      <p className="mb-4">{post.briefText}</p>
      <p className="mb-8">{post.text}</p>
      <div className="relative aspect-video overflow-hidden rounded-lg mb-10 w-full lg:w-3/4  mx-auto">
        <Image
          src={post.coverImageUrl}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 
                 (max-width: 1024px) 75vw, 
                 768px"
          className="object-fill object-center hover:scale-110 transition-all ease-out duration-300"
        />
      </div>
      {post.related.length > 0 && <RelatedPost posts={post.related} />}
      <PostComment post={post} />
    </div>
  );
}

export default SinglePost;
