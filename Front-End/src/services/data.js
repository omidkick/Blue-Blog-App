import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import { getAllUsersApi } from "./authService";
import { getAllCommentApi } from "./commentService";
import { getPosts } from "./postServices";
import toast from "react-hot-toast";

export async function fetchCardData() {
  const cookieStore = cookies();
  const options = await setCookieOnReq(cookieStore);

  try {
    const data = await Promise.all([
      getAllUsersApi(options),
      getAllCommentApi(options),
      getPosts(),
    ]);

    const numberOfUsers = Number(data[0].users.length ?? "0");
    const numberOfComments = Number(data[1].commentsCount ?? "0");
    const numberOfPosts = Number(data[2].posts.length ?? "0");
    return {
      numberOfUsers,
      numberOfComments,
      numberOfPosts,
    };
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}
