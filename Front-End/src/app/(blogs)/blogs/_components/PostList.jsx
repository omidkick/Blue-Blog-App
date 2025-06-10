import CoverImage from "./CoverImage";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import Author from "./Author";
import PostInteraction from "./PostInteraction";
import { postTypeStyle } from "@/utils/postTypeStyle";
import truncateText from "@/utils/trancateText";

async function PostList({ posts }) {
  return posts.length > 0 ? (
    <div className="grid grid-cols-12 gap-8 py-8">
      {posts.map((post) => (
        <div
          key={post._id}
          className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-300 p-2 rounded-lg"
        >
          {/* Post Image */}
          <CoverImage {...post} />

          {/* Post Content */}
          <div>
            {/* Title + Badge */}
            <Link href={`/blogs/${post.slug}`}>
              <h2 className="mb-4 md:mb-5 font-bold text-secondary-700 flex items-center justify-between">
                {truncateText(post.title, 25)}
                {post.type && (
                  <span className={`text-xs font-medium ${postTypeStyle[post.type]?.className}`}>
                    {postTypeStyle[post.type]?.label}
                  </span>
                )}
              </h2>
            </Link>
            {/* Post Author - Reading Time */}
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <Author {...post.author} />
              <div className="flex items-center text-[10px] text-secondary-500">
                <ClockIcon className="w-4 h-4 stroke-secondary-500 ml-1" />
                <span className="ml-1">خواندن :</span>
                <span className="ml-1 leading-3">{post.readingTime}</span>
                <span>دقیقه</span>
              </div>
            </div>

            <PostInteraction post={post} />
          </div>
        </div>
      ))}
    </div>
  ) : null;
}

export default PostList;
