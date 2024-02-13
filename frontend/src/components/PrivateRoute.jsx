import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { userInfo } = useSelector((state) => state?.auth);
  //   console.log("userInfo", userInfo);
  return userInfo ? element : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
