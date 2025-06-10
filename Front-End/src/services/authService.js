import http from "./httpService";

export async function signinApi(data) {
  return http.post(`/user/signin`, data).then(({ data }) => data.data);
}

export async function signupApi(data) {
  return http.post(`/user/signup`, data).then(({ data }) => data.data);
}

export async function getUserApi(options) {
  return http.get("/user/profile", options).then(({ data }) => data.data);
}

export async function getAllUsersApi(options) {
  return http.get("/user/list", options).then(({ data }) => data.data);
}

export function logoutApi() {
  return http.post(`/user/logout`);
}

// update profile
export async function editUserApi(data) {
  return http.patch(`/user/update`, data).then(({ data }) => data.data);
}

// upload Avatar
export async function uploadAvatarApi(data) {
  return http.post(`/user/upload-avatar`, data).then(({ data }) => data.data);
}
