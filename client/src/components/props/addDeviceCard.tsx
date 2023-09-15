import { getToken, getUserId } from '../../services/auth.service'
import '../../styles/components/Overlay.css'
import '../../styles/props/DeviceCard.css'
import '../../styles/props/form.css'
import plus from '../../assets/plus.svg'
import { Overlay } from '../Overlay'
import { useState } from 'react';
import { Loader } from './loader'
import { Downloader } from './downloader'

export function AddDeviceCard() {
    const [opened, setOpened] = useState(false);
    const [loaderOpened, setLoaderOpened] = useState(false);
    const [downloaderOpened, setDownloaderOpened] = useState(false);
    const [file, setFile] = useState<Response>();

    function openOverlay() {
        setOpened(true);
    }

    function close(){
        setOpened(false);
    }
    function closeDownloader(){
        setDownloaderOpened(false);
    }
    async function createDevice() {
        const name = document.getElementById("deviceName") as HTMLInputElement;  
        const os = document.querySelector('select[name="os"]') as HTMLSelectElement;
        if (name.value.trim() === "") {
            name.value = "MacBook";
        }
          const token = getToken();
          const userId = getUserId();
          const result = await fetch(`http://localhost:3000/users/${userId}/devices/create`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name.value,
                os: os.value
              })
          })
          const resultInJson = await result.json();
          console.log(resultInJson);
          if(result.status === 201){
            close();
            setLoaderOpened(true);
            const file = await fetch(`http://localhost:3000/users/${userId}/devices/${resultInJson.id}/script/download`, {
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

      }

    return (
        <>
            <div className="deviceCard" onClick={openOverlay}>
                <img className='plus' src={plus} alt='addImg'/>
            </div>

           {opened && <Overlay close={close} children={
            <>
                <div className='input-div'>
                    <label htmlFor="deviceName">Name</label> 
                    <input className='input' type="text" name="deviceName" id="deviceName" placeholder='MacBock'/>
                </div>
                <div className='select-div'>
                    <label htmlFor="os">OS</label> 
                    <select name="os" disabled defaultValue="Windows">
                        <option value="Windows">Windows</option>
                        <option value="MacOS" >MacOS</option>  
                        <option value="Linux">Linux</option>
                    </select>
                </div>
                <div className='buttons-div'>
                    <button onClick={close}>Cancel</button>
                    <button className='action-button' onClick={createDevice}>Create</button>
                </div>
            </>  
           }/>}
           {loaderOpened && <Loader/>}
           {downloaderOpened && <Downloader close={closeDownloader} file={file!}/>}
        </>
    )
}