import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();

    // Clear cache (optional)
    if (caches && caches.keys) {
      caches.keys().then(function (names) {
        names.forEach(function (name) {
          caches.delete(name);
        });
      });
    }

    // Redirect to login page or any other desired page
    navigate('/login');
    window.location.reload();
  }, [navigate]);

  return null; // Or you can render a loading/spinner component
};

export default LogoutComponent;
