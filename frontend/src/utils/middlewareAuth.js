export async function middlewareAuth(req) {
  // set cookies => refresh and access
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value};`,
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
    options
  );

  const { data } = await res.json();
  const { user } = data || {};
  return user;
}
