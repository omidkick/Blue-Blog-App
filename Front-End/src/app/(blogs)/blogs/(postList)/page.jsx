// Imports
import PostList from "../_components/PostList";
import { cookies } from "next/headers";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPosts } from "@/services/postServices";
import queryString from "query-string";
import { toPersianDigits } from "@/utils/numberFormatter";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { Suspense } from "react";
import { Spinner } from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import PostListLoading from "@/ui/PostListLoading";

async function BlogPage({ searchParams }) {
  const awaitedSearchParams = await searchParams;
  const queries = queryString.stringify(awaitedSearchParams);
  const cookieStore = cookies();
  const options = await setCookieOnReq(cookieStore);
  const { posts, totalPages } = await getPosts(queries, options);

  const { search } = await searchParams;

  return (
    <section>
      {/* PostList__Header */}
      <header className="mb-6">
        {/* Title */}
        <h1 className="text-xl font-extrabold text-secondary-700 lg:text-2xl">
          لیست پست‌ها
        </h1>
        {/* Search-Result number */}
        {search && (
          <>
            {posts.length === 0 ? (
              <div className="mt-8 md:mt-10 flex flex-col items-center justify-center space-y-3 ">
                <HiOutlineExclamationCircle className="w-10 h-10 text-error" />
                <p className="text-sm sm:text-base">
                  هیچ پستی با این مشخصات پیدا نشد!
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm sm:text-base leading-relaxed">
                نمایش {toPersianDigits(posts.length)} نتیجه برای{" "}
                <span className="font-semibold text-primary-800">
                  &quot;{search}&quot;
                </span>
              </p>
            )}
          </>
        )}
      </header>

      {/* Posts */}
      <Suspense fallback={<PostListLoading />} key={queries}>
        <PostList posts={posts} />
      </Suspense>

      {/* Pagination */}
      <div className=" flex w-full justify-center my-5">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}

export default BlogPage;
