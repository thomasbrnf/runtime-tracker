import { Overlay } from "../../../components";
import { Device } from "../../../interfaces/Device";

export function ActionOverlay({
  device,
  onClose,
  onDownload,
  onEdit,
  onDelete,
}: {
  device: Device;
  onClose: () => void;
  onDownload: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Overlay close={onClose}>
      <div className="info-device">
        <h1>{device.name}</h1>
        <div className="button-group">
          <button className="desktop-only" onClick={onDownload}>
            Download Script
          </button>
          <button onClick={onEdit}>Edit name</button>
          <button
            className={`delete-button  ${device.online ? "hidden" : ""}`}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Overlay>
  );
}
