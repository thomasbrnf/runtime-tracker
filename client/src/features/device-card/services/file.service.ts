import { getToken, getUserId } from "../../../services/auth.service";

export async function downloadFile(response: Response) {
  const blob = await response.blob();

  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "RuntimeTracker.exe";
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);

  downloadLink.click();

  URL.revokeObjectURL(downloadLink.href);
  document.body.removeChild(downloadLink);
}

export async function fetchFile(deviceId: number) {
  const token = getToken();
  const userId = getUserId();

  const result = await fetch(
    `http://localhost:3000/users/${userId}/devices/${deviceId}/script/download`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return result;
}
