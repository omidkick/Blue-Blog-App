import http from "./httpService";

// get single posts info
export async function getPostBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/slug/${slug}`
  );
  const { data } = await res.json();
  const { post } = data || {};

  return post;
}

// get all posts(Fetch)
export async function getPosts(queries, options) {
  // Latency for test loading
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/list/?${queries}`,
    options
  );
  const { data } = await res.json();
  const { posts, totalPages } = data || {};
  // console.log(posts);
  return { posts, totalPages };
}

// Like Post API
export async function likePostApi(postId) {
  return http.post(`/post/like/${postId}`).then(({ data }) => data.data);
}

//Bookmark post API
export async function bookmarkPostApi(postId) {
  return http.post(`/post/bookmark/${postId}`).then(({ data }) => data.data);
}

// Create Post API
export async function createPostApi(data) {
  return http.post(`/post/create/`, data).then(({ data }) => data.data);
}

// Delete Post API
export async function deletePostApi({ id, options }) {
  return http
    .delete(`/post/remove/${id}`, options)
    .then(({ data }) => data.data);
}

// Edit Post API
export async function editPostApi({ id, data }) {
  return http.patch(`/post/update/${id}`, data).then(({ data }) => data.data);
}

// Get Post By Id
export async function getPostById(id) {
  return http.get(`/post/${id}`).then(({ data }) => data.data);
}
