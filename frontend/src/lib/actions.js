"use server";

import { createCommentApi } from "@/services/commentService";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// export async function createComment(postId, parentId, formData) {...}

export async function createComment(prevState, { formData, postId, parentId }) {
  // send cookies for determine the user
  const cookieStore = cookies();
  const options = await setCookieOnReq(cookieStore);

  const rawFormData = {
    postId,
    parentId,
    text: formData.get("text"),
  };

  try {
    const { message } = await createCommentApi(rawFormData, options);
    revalidatePath("blogs/[slug]");
    return {
      message,
    };
  } catch (err) {
    const error = err?.response?.data?.message;

    return { error };
  }
}
