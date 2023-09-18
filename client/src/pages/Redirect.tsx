import { useLocation, useNavigate } from "react-router-dom";
import { setCookies } from "../services/auth.service";
import { useEffect } from "react";

export function Redirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    setCookies(queryParams);

    navigate("/personal-panel");
  }, [location]);

  return (
    <div>
      <span className="loader"></span>
    </div>
  );
}
