import logo from "../assets/runtimeTrackerLogo.svg";
import googleLogo from "../assets/googleLogo.svg";
import "../styles/Login.css";

export function Login() {
  const handleLogin = async () => {
    window.location.href = "http://localhost:3000/auth";
  };

  return (
    <>
      <div className="login">
        <img src={logo} className="mainLogo" alt="logo" draggable="false" />

        <button onClick={handleLogin} className="googleButton">
          <img className="googleLogo" src={googleLogo} alt="googleLogo" />
          <span>Continue with Google</span>
        </button>
      </div>
    </>
  );
}
