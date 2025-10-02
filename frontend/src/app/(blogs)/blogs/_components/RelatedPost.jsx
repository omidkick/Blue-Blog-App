import truncateText from "@/utils/trancateText";
import Author from "./Author";
import CoverImage from "./CoverImage";
import Link from "next/link";

function RelatedPost({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="mb-10 mt-20 border border-secondary-200 rounded-xl p-4">
      {/* Section Title */}
      <p className="text-lg  font-bold text-secondary-700 mb-4 px-2">
        <span className="inline-block border-b-2 border-primary-900 pb-2">
          پست‌های مرتبط
        </span>
      </p>

      <div className="flex gap-4 overflow-x-auto p-4 pb-2 scroll-smooth scrollbar-thin">
        {posts.map((item) => (
          <div
            key={item._id}
            className="min-w-[250px] md:max-w-[270px] shrink-0  overflow-hidden bg-secondary-200 cursor-pointer hover:shadow-md transition-shadow p-2 mb-2 rounded-lg"
          >
            {/* Cover Image */}
            <CoverImage {...item} />

            {/* Content */}
            <div className="p-3 space-y-2">
              <Link href={`/blogs/${item.slug}`}>
                <h3 className="text-sm font-semibold text-secondary-700 hover:text-primary-700 transition-colors line-clamp-2">
                  {truncateText(item.title, 30)}
                </h3>
              </Link>

              <div className="flex items-center justify-between text-xs text-secondary-500">
                <Author {...item.author} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedPost;
