import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const RequireAuth = ({ children }) => {
  const [cookies] = useCookies(['jwt']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.jwt) {
      navigate('/'); 
    } 
  }, [cookies.jwt, navigate]);

  return <>{children}</>; // Affiche les enfants du composant après redirection
};

export default RequireAuth;
