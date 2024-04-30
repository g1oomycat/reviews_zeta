import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../config/firebase";

const Protected = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to={"/sign_in"} />;
};

export default Protected;
