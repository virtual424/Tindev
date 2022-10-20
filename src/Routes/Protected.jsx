import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const Protected = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  return (
    <Routes>
      <Route
        {...rest}
        element={isAuthenticated ? children : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default Protected;
