// AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from 'jwt-decode';
import { Navigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: '',
    token: '',
    userId: '',
    role: '',
  });
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if a valid token exists in cookies
      const jwtToken = cookies.jwt;
      if (jwtToken) {
        try {
          // Decode the JWT to get user information
          const decodedToken = jwtDecode(jwtToken);

          // Extract the user's role
          const userRole = decodedToken.role;
          // Set the user information in the AuthContext
          setAuth({
            token: jwtToken,
            email: decodedToken.email,
            userId: decodedToken.id,
            role: userRole,
          });
        } catch (error) {
         
          console.error("Error decoding JWT:", error);
          // Clear cookies if an invalid token is found
          removeCookie("jwt");
          setAuth({
            email: '',
            token: '',
            userId: '',
            role: '',
          });
          return <Navigate to="/login" />;

        }
      } else {
        // Clear the auth state if there is no token
        setAuth({
          email: '',
          token: '',
          userId: '',
          role: '',
        });
      }
    };

    checkAuth();
  }, [cookies.jwt, removeCookie, setAuth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};