import { getToken, getUserId } from "../../../services/auth.service";

export async function fetchDevices() {
  const token = getToken();
  const userId = getUserId();
  const result = await fetch(`/users/${userId}/devices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (result.status === 401) return null;
  return await result.json();
}
