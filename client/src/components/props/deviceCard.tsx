import laptopBg from '../../assets/laptopCard.svg'
import { Device } from '../../types/types';
import '../../styles//props/DeviceCard.css'
import '../../styles//props/deviceInfo.css'
import { Overlay } from '../Overlay';
import { useState } from 'react';
import { getToken, getUserId } from '../../services/auth.service';
import { Loader } from './loader';
import { Downloader } from './downloader';

export function DeviceCard({device}: {device: Device}) {
    const [opened, setOpened] = useState(false);
    const [loaderOpened, setLoaderOpened] = useState(false);
    const [editorOpened, setEditorOpened] = useState(false);
    const [downloaderOpened, setDownloaderOpened] = useState(false);
    const [file, setFile] = useState<Response>();

    function openOverlay() {
        setOpened(true);
    }

    function closeOverlay() {
        setOpened(false);
    }
    function closeDownloader(){
        setDownloaderOpened(false);
    }
    async function deleteDevice() {
        const token = getToken();
        const userId = getUserId();
        const result = await fetch(`http://localhost:3000/users/${userId}/devices/${device.id}/delete`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        const resultInJson = await result.json();
        console.log(resultInJson);

        closeOverlay();
    }
    async function downloadFile() {
        closeOverlay();
        setLoaderOpened(true);

        const token = getToken();
        const userId = getUserId();
        const file = await fetch(`http://localhost:3000/users/${userId}/devices/${device.id}/script/download`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(file)
            if(file.ok){
                setLoaderOpened(false);
                setDownloaderOpened(true);
                setFile(file);
            } else {
                console.error("Request failed with status:", file.status);
            }
    }

    async function editDevice() {
        closeOverlay();
        setEditorOpened(true);
        const name = document.getElementById("deviceName") as HTMLInputElement;  
        console.log(name.value)
        const token = getToken();
        const userId = getUserId();
        const response = await fetch(`http://localhost:3000/users/${userId}/devices/${device.id}/edit`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.value,
                  })
            });
        console.log(response.status);
        setEditorOpened(false);
    }
    function openEditor() {
        closeOverlay();
        setEditorOpened(true);
    }
    function closeEditor() {
        setEditorOpened(false);
        openOverlay();
    }
    return(
        <>
        <div className="deviceCard" onClick={openOverlay}>

                <div className='topContent'>
                    <span className={`status ${device.online ? 'online' : 'offline'}`} />
                    <p className={`${device.online ? 'online-text' : 'offline-text'}`}>{device.online ? 'online' : 'offline'}</p>
                </div>

                <h2>{
                    device.name.length > 11 ?
                    device.name.slice(0, 9) + '...' : device.name
                }</h2>

            <img src={laptopBg} alt='laptopBg' className='bg'/>

        </div>
        {opened && <Overlay close={closeOverlay} children={
            <div className='info-device'>
                <h1>{device.name}</h1>
                <div className='button-group'>
                    <button onClick={downloadFile}>Download Script</button>
                    <button onClick={openEditor}>Edit name</button>
                    <button className='delete-button' onClick={deleteDevice}>Delete</button>
                </div>
            </div>
        }
        />}
        {loaderOpened && <Loader/>}
        {downloaderOpened && <Downloader close={closeDownloader} file={file!}/>}
        {editorOpened && <Overlay close={closeEditor} children={
            <>
                <div className='input-div'>
                    <label htmlFor="deviceName">Name</label> 
                    <input defaultValue={device.name} className='input' type="text" name="deviceName" id="deviceName" placeholder='MacBock'/>
                </div>
                <div className='buttons-div'>
                    <button onClick={closeEditor}>Cancel</button>
                    <button className='action-button' onClick={editDevice}>Confirm</button>
                </div>
            </>  
           }/>}
        </>
    )
} 