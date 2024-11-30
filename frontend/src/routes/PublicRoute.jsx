import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PublicRoute = ({ children }) => {
  const [cookies] = useCookies(['jwt']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate('/post');  }
  }, [cookies.jwt, navigate]);

  return !cookies.jwt ? <>{children}</> : null;
};

export default PublicRoute;
