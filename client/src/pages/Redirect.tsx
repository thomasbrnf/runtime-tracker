import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';  

export function Redirect() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('access_token'); 
        const userId = queryParams.get('user_id');

        document.cookie = `accessToken=${token}; path=/`;
        document.cookie = `userId=${userId}; path=/`;

        navigate("/personal-panel");
       }, [location]);
    return (
      <div>
        <span className="loader"></span>
      </div>
    );
  }