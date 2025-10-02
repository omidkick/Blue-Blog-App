import PostList from "@/app/(blogs)/blogs/_components/PostList";
import { getPosts } from "@/services/postServices";
import BlogSliderClient from "./BlogSliderClient";

async function BlogSlider() {
  const queries = "sort=latest&limit=7";
  const { posts } = await getPosts(queries);
  return <div className="px-4 md:px-0">
    <BlogSliderClient posts={posts} />
  </div>;
}

export default BlogSlider;
