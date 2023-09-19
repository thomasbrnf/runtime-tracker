import { getToken, getUserId } from "../../../services/auth.service";

export async function fetchDevices() {
  const token = getToken();
  const userId = getUserId();
  const result = await fetch(`http://localhost:3000/users/${userId}/devices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (result.status === 401) return null;
  return await result.json();
}
