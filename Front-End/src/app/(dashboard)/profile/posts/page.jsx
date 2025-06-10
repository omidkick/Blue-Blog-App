import PostsTable from "./_/components/PostsTable";
import { Suspense } from "react";
import { Spinner } from "@/ui/Spinner";
import Search from "@/ui/Search";
import { CreatePost } from "./_/components/Buttons";
import queryString from "query-string";
import { getPosts } from "@/services/postServices";
import Pagination from "@/ui/Pagination";

async function Page({ searchParams }) {
  const awaitedSearchParams = await searchParams;
  const query = queryString.stringify(awaitedSearchParams);

  const { totalPages } = await getPosts(query);

  return (
    <div>
      {/* PostList__Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-secondary-700 mb-12 items-center">
        <h1 className="font-bold text-xl">لیست پست ها</h1>
        <Search />
        <CreatePost />
      </div>

      {/* PostList__Table */}
      <Suspense fallback={<Spinner />} key={query}>
        <PostsTable query={query} />
      </Suspense>

      {/* Pagination */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Page;
