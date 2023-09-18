export function getToken() {
  const tokenCookie = document.cookie.match(
    /(?:^|;)\s*accessToken\s*=\s*([^;]+)/,
  );
  return tokenCookie ? tokenCookie.pop() : null;
}

export function getUserId() {
  const userId = document.cookie.match(/(?:^|;)\s*userId\s*=\s*([^;]+)/);
  return userId ? userId.pop() : null;
}

export function setCookies(queryParams: URLSearchParams) {
  const token = queryParams.get("access_token");
  const userId = queryParams.get("user_id");

  document.cookie = `accessToken=${token}; path=/`;
  document.cookie = `userId=${userId}; path=/`;
}
