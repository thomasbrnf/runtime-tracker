import { DeviceCard, CreateDeviceCard } from "../device-card";
import { Device } from "../../interfaces/Device";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchDevices } from "./services";
import "./styles/Devices.css";

export function Devices({}) {
  const [devices, setDevices] = useState<Device[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setContent();
  }, [devices]);

  async function setContent() {
    const devices = await fetchDevices();
    if (!devices) navigate("/");
    setDevices(devices);
  }

  return (
    <>
      <h1>Devices</h1>
      <section className="devices-grid">
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
        <CreateDeviceCard />
      </section>
    </>
  );
}
