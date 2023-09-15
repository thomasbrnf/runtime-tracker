export function getToken() {
    const tokenCookie = document.cookie.match(/(?:^|;)\s*accessToken\s*=\s*([^;]+)/);
    return tokenCookie ? tokenCookie.pop() : null;
  }


export function getUserId() {
  const userId = document.cookie.match(/(?:^|;)\s*userId\s*=\s*([^;]+)/);
    return userId ? userId.pop() : null;
}