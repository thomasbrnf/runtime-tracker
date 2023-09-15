import { Overlay } from "../Overlay";
import '../../styles/props/loader.css';

export function Loader() {
    return(
        <Overlay children={
            <div className="loader-div">
                <p>Generating script</p>
                <div className="loader"></div>
            </div>
        }/>
    )
}