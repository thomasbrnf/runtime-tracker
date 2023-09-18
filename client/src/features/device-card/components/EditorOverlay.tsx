import { Overlay } from "../../../components";
import { Device } from "../../../interfaces/Device";
import { editDevice } from "../services/device.api";

export function EditorOverlay({
  device,
  onClose,
}: {
  device: Device;
  onClose: () => void;
}) {
  async function onEdit() {
    await editDevice(device.id);
    onClose();
  }
  return (
    <Overlay close={onClose}>
      <div className="input-div">
        <label htmlFor="deviceName">Name</label>
        <input
          defaultValue={device.name}
          className="input"
          type="text"
          name="deviceName"
          id="deviceName"
          placeholder="MacBock"
        />
      </div>
      <div className="buttons-div">
        <button onClick={onClose}>Cancel</button>
        <button className="action-button" onClick={onEdit}>
          Confirm
        </button>
      </div>
    </Overlay>
  );
}
