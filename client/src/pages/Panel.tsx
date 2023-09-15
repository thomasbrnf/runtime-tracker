import { Devices } from "../components/Devices";
import { Sessions } from "../components/Sessions";
import { getToken } from "../services/auth.service";
import { SideBar } from "../components/SideBar";
import { Navigate } from "react-router-dom";
import '../styles/Panel.css'
import { useState } from 'react';

export function Panel() {
    const [content, setContnent] = useState('devices');

    const token = getToken();
    if(!token) {
        return <Navigate to="/" />
    } 
    return (
        <>  
            <SideBar setContent={setContnent}  />
            <main>
                {content === 'devices' && <Devices />}
                {content === 'sessions' && <Sessions />} 


            </main>
        </>
    )
}