import { Overlay } from "../Overlay";


export function Downloader({file, close}: {file: Response, close:() => void}) {
    async function downloadFile() {
        const blob = await file.blob();

        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "RuntimeTracker.exe";
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();

        URL.revokeObjectURL(downloadLink.href);
        document.body.removeChild(downloadLink);

        close();
    }
    return(
        <Overlay close={close} children={
            <div className="loader-div">
                <button className="download-button" onClick={downloadFile}>DOWNLOAD</button>
            </div>
        }/>
    )
}