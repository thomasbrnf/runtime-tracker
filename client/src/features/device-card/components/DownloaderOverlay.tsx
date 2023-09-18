import { Overlay } from "../../../components/Overlay";

export function DownloaderOverlay({
  onClose,
  onDownload,
}: {
  onClose: () => void;
  onDownload: () => void;
}) {
  return (
    <Overlay close={onClose}>
      <div className="loader-div">
        <button className="download-button" onClick={onDownload}>
          DOWNLOAD
        </button>
      </div>
    </Overlay>
  );
}
