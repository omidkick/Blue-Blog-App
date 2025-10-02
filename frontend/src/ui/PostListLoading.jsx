import { ClockIcon } from "@heroicons/react/24/outline";

function PostListLoading({ count = 6 }) {
  return (
    <div className="grid grid-cols-12 gap-8 py-8">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-300 p-2 rounded-lg"
        >
          {/* Skeleton for Cover Image */}
          <div className="bg-gray-200 w-full h-48 rounded-md animate-pulse"></div>

          {/* Skeleton for Post Content */}
          <div className="mt-4">
            {/* Title */}
            <div className="bg-gray-200 h-6 w-3/4 rounded-md animate-pulse mb-3"></div>

            {/* Author and Reading Time */}
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <div className="flex gap-2 items-center">
                <div className="bg-gray-200 rounded-full w-10 h-10 animate-pulse"></div>
                <div className="w-32 bg-gray-200 h-4 rounded-md animate-pulse"></div>
              </div>
              <div className="flex items-center text-[10px] text-secondary-500">
                <ClockIcon className="w-4 h-4 stroke-secondary-500 ml-1 animate-pulse" />
                <div className="w-12 bg-gray-200 h-3 rounded-md animate-pulse ml-2"></div>
              </div>
            </div>

            {/* Post Interaction */}
            <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostListLoading;
