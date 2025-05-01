import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex w-full pr-20">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashboardRoot;
