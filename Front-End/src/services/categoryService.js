import http from "./httpService";

export async function getCategoryApi(options) {
  return http.get("/category/list", options).then(({ data }) => data.data);
}

// Delete Category
export async function deleteCategoryApi({ id, options }) {
  return http
    .delete(`/category/remove/${id}`, options)
    .then(({ data }) => data.data);
}

// Edit category API
export async function editCategoryApi({ id, data }) {
  return http
    .patch(`/category/update/${id}`, data)
    .then(({ data }) => data.data);
}

// Add Category API
export async function addCategoryApi(data) {
  return http.post(`/category/add/`, data).then(({ data }) => data.data);
}
