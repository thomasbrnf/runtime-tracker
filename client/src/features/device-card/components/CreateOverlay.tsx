import { Overlay } from "../../../components";

export function CreateOverlay({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <Overlay close={onClose}>
      <div className="input-div">
        <label htmlFor="deviceName">Name</label>
        <input
          className="input"
          type="text"
          name="deviceName"
          id="deviceName"
          placeholder="MacBock"
        />
      </div>

      <div className="select-div">
        <label htmlFor="os">OS</label>
        <select name="os" disabled defaultValue="Windows">
          <option value="Windows">Windows</option>
          <option value="MacOS">MacOS</option>
          <option value="Linux">Linux</option>
        </select>
      </div>

      <div className="buttons-div">
        <button onClick={onClose}>Cancel</button>
        <button className="action-button" onClick={onSubmit}>
          Create
        </button>
      </div>
    </Overlay>
  );
}
