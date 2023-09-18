import { Devices } from "../features/devices/Devices";
import { Sessions } from "../features/sessions/Sessions";
import { getToken } from "../services/auth.service";
import { SideBar } from "../features/side-bar";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export function Panel() {
  const [content, setContnent] = useState("devices");

  const token = getToken();
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <SideBar setContent={setContnent} />
      <main>
        {content === "devices" && <Devices />}
        {content === "sessions" && <Sessions />}
      </main>
    </>
  );
}
