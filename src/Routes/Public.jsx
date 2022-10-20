import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const Public = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  return (
    <Routes>
      <Route
        {...rest}
        element={isAuthenticated ? <Navigate to="/feeds" /> : children}
      />
    </Routes>
  );
};

export default Public;
