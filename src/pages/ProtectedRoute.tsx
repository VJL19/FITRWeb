import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";
import { useGetAccessWebTokenQuery } from "src/reducers/login";

const ProtectedRoute = () => {
  const { data, status, error } = useGetAccessWebTokenQuery();

  return data?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
