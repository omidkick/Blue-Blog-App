// utils/getTopBloggers.js

import { getAllUsersApi } from "@/services/authService";
import { getPosts } from "@/services/postServices";
import { cookies } from "next/headers";
import setCookieOnReq from "./setCookieOnReq";

export async function getTopBloggers(limit = 5) {
  const cookieStore = cookies();
  const options = await setCookieOnReq(cookieStore);

  try {
    // 1. Get users
    const usersRes = await getAllUsersApi();
    const users = Array.isArray(usersRes) ? usersRes : usersRes?.users || usersRes?.data || [];

    // 2. Get all posts
    const { posts } = await getPosts("", options);

    // 3. Count how many posts per user
    const postCountMap = posts.reduce((acc, post) => {
      const userId = post.user?._id || post.user;
      if (userId) {
        acc[userId] = (acc[userId] || 0) + 1;
      }
      return acc;
    }, {});

    // 4. Attach postCount to each user
    const usersWithPostCounts = users.map((user) => ({
      ...user,
      postCount: postCountMap[user._id] || 0,
    }));

    // 5. Sort by postCount DESC and return top N
    const sortedUsers = usersWithPostCounts.sort((a, b) => b.postCount - a.postCount);

    return sortedUsers.slice(0, limit);
  } catch (err) {
    console.error("Error fetching top bloggers:", err);
    return [];
  }
}
