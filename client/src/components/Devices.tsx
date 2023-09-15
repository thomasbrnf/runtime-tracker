import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DeviceCard } from "./props/deviceCard";
import { getToken, getUserId } from '../services/auth.service';
import { Device } from '../types/types';
import { AddDeviceCard } from './props/addDeviceCard';
import '../styles/components/Devices.css';

export function Devices({}) {
    const [devices, setDevices] = useState<Device[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
    fetchDevices();
    }, [devices])
    async function fetchDevices() {
        const token = getToken();
        const userId = getUserId();
        const result = await fetch(`http://localhost:3000/users/${userId}/devices`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        const resultInJson = await result.json();
        if(result.status === 401) return navigate("/");
        setDevices(resultInJson);
    }
    return (
        <>
        <h1>Devices</h1>
        <section className="devices-grid">
            {devices.map((device) => (
                <DeviceCard 
                key={device.id} 
                device={device}/>
            ))}
            <AddDeviceCard/>
        </section>
        </>
    )
}