// Imports
import { getUserApi } from "@/services/authService";
import { getPosts } from "@/services/postServices";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import MyPostsTable from "./MyPostsTable";
import Pagination from "@/ui/Pagination";

export default async function MyPostsTableWrapper({ searchParams }) {
  const awaitedSearchParams = await searchParams;
  const page = Number(awaitedSearchParams?.page) || 1;
  const limit = Number(awaitedSearchParams?.limit) || 6;
  const startIndex = (page - 1) * limit;

  const cookieStore = cookies();
  const options = await setCookieOnReq(cookieStore);
  const { user } = await getUserApi(options);
  const { posts } = await getPosts("", options);

  const userPosts =
    posts?.filter((post) => post.author?._id === user._id) || [];

  const paginatedPosts = userPosts.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(userPosts.length / limit);

  return (
    <>
      <MyPostsTable posts={paginatedPosts} />
      <div className="flex justify-center my-6">
        <Pagination totalPages={totalPages} currentPage={page} />
      </div>
    </>
  );
}
