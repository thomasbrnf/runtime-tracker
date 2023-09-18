import { getToken, getUserId } from "../../../services/auth.service";

export async function deleteDevice(deviceId: number) {
  const userId = getUserId();
  const token = getToken();

  const result = await fetch(`/users/${userId}/devices/${deviceId}/delete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result.status;
}

export async function editDevice(deviceId: number) {
  const name = document.getElementById("deviceName") as HTMLInputElement;
  const userId = getUserId();
  const token = getToken();

  const response = await fetch(`/users/${userId}/devices/${deviceId}/edit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
    }),
  });

  console.log(response.status);
}

export async function createDevice() {
  const name = document.getElementById("deviceName") as HTMLInputElement;
  const os = document.querySelector('select[name="os"]') as HTMLSelectElement;
  const userId = getUserId();
  const token = getToken();

  if (name.value.trim() === "") {
    name.value = "MacBook";
  }

  const result = await fetch(`/users/${userId}/devices/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      os: os.value,
    }),
  });

  return await result.json();
}
