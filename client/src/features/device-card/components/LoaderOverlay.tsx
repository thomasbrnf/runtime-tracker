import { Overlay } from "../../../components";
import "../styles/Loader.css";

export function LoaderOverlay() {
  return (
    <Overlay>
      <div className="loader-div">
        <p>Generating script</p>
        <div className="loader"></div>
      </div>
    </Overlay>
  );
}
