import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

const SemiProtected = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  const activated = useSelector((state) => state.userReducer.activated);

  return (
    <Routes>
      <Route
        {...rest}
        element={
          isAuthenticated ? (
            <Navigate to="/home" />
          ) : isAuthenticated && !activated ? (
            children
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default SemiProtected;
