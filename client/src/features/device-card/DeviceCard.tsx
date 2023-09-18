import {
  ActionOverlay,
  DownloaderOverlay,
  EditorOverlay,
  LoaderOverlay,
} from "./components";
import { downloadFile, fetchFile, deleteDevice } from "./services";
import laptopBg from "./assets/laptopCard.svg";
import { Device } from "../../interfaces/Device";
import "./styles/DeviceActionOverlay.css";
import { useCardActions } from "./hooks";
import "./styles/DeviceCard.css";

export function DeviceCard({ device }: { device: Device }) {
  const {
    actionOpened,
    editorOpened,
    loaderOpened,
    downloaderOpened,
    response,
    openActionOverlay,
    closeActionOverlay,
    openLoaderOverlay,
    closeLoaderOverlay,
    openDownloaderOverlay,
    closeDownloaderOverlay,
    openEditorOverlay,
    closeEditorOverlay,
    setResponse,
  } = useCardActions();

  async function handleFileGeneration() {
    closeActionOverlay();
    openLoaderOverlay();

    const response = await fetchFile(device.id);
    setResponse(response);

    closeLoaderOverlay();
    openDownloaderOverlay();
  }

  function openEdit() {
    openEditorOverlay();
    closeActionOverlay();
  }

  async function handleDelete() {
    await deleteDevice(device.id);
    closeActionOverlay();
  }

  async function handleDownload() {
    await downloadFile(response!);
    closeDownloaderOverlay();
  }

  return (
    <>
      <div className="deviceCard" onClick={openActionOverlay}>
        <div className="online-status">
          <span className={`status ${device.online ? "online" : "offline"}`} />
          <p className={`${device.online ? "online-text" : "offline-text"}`}>
            {device.online ? "online" : "offline"}
          </p>
        </div>
        <h2 className="device-name">
          {device.name.length > 11
            ? device.name.slice(0, 9) + "..."
            : device.name}
        </h2>
        <h2 className="device-name-mobile">{device.name}</h2>

        <img src={laptopBg} alt="laptopBg" className="bg" />
      </div>

      {actionOpened && (
        <ActionOverlay
          device={device}
          onClose={closeActionOverlay}
          onEdit={openEdit}
          onDownload={handleFileGeneration}
          onDelete={handleDelete}
        />
      )}
      {editorOpened && (
        <EditorOverlay device={device} onClose={closeEditorOverlay} />
      )}
      {loaderOpened && <LoaderOverlay />}
      {downloaderOpened && (
        <DownloaderOverlay
          onClose={closeDownloaderOverlay}
          onDownload={handleDownload}
        />
      )}
    </>
  );
}
