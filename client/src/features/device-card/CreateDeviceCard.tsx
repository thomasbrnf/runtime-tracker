import { DownloaderOverlay, LoaderOverlay, CreateOverlay } from "./components";
import { downloadFile, fetchFile, createDevice } from "./services";
import { Device } from "../../interfaces/Device";
import { isDesktop } from "../side-bar/services";
import "../../styles/components/Overlay.css";
import { useCardActions } from "./hooks";
import plus from "./assets/plus.svg";
import "./styles/DeviceCard.css";
import "./styles/Form.css";

export function CreateDeviceCard() {
  const {
    createOpened,
    loaderOpened,
    downloaderOpened,
    response,
    openCreateOverlay,
    closeCreateOverlay,
    openLoaderOverlay,
    closeLoaderOverlay,
    openDownloaderOverlay,
    closeDownloaderOverlay,
    setResponse,
  } = useCardActions();

  async function handleCreation() {
    const device: Device = await createDevice();
    if (isDesktop()) {
      handleFileGeneration(device.id);
    } else {
      closeCreateOverlay();
    }
  }

  async function handleFileGeneration(deviceId: number) {
    closeCreateOverlay();
    openLoaderOverlay();

    const response = await fetchFile(deviceId);
    setResponse(response);

    closeLoaderOverlay();
    openDownloaderOverlay();
  }

  async function handleDownload() {
    await downloadFile(response!);
    closeDownloaderOverlay();
  }

  return (
    <>
      <div className="deviceCard add" onClick={openCreateOverlay}>
        <img className="plus" src={plus} alt="addImg" />
      </div>

      {createOpened && (
        <CreateOverlay onClose={closeCreateOverlay} onSubmit={handleCreation} />
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
