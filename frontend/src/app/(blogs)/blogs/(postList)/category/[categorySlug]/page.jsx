import PostList from "@/app/(blogs)/blogs/_components/PostList";
import { getPosts } from "@/services/postServices";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import queryString from "query-string";

async function Category({ params, searchParams }) {
  const { categorySlug } = await params;
  const awaitedSearchParams = await searchParams;
  // const queries =
  //   queryString.stringify(searchParams) + "&" + `categorySlug=${categorySlug}`;
  const queries = `${queryString.stringify(
    awaitedSearchParams
  )}&categorySlug=${categorySlug}`;

  const cookieStore = cookies();
  const options = await setCookieOnReq(cookieStore);
  const {posts} = await getPosts(queries, options);

  return (
    <div>
      {posts.length === 0 ? (
        <p className="flex flex-col items-center text-secondary-600 text-center text-base sm:text-lg md:text-xl p-6 mx-4 my-8 rounded-xl bg-secondary-100  shadow-sm">
          <ExclamationCircleIcon className="w-10 h-10 mb-3 text-error " />
          هیچ پستی در این دسته بندی یافت نشد!
        </p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default Category;
