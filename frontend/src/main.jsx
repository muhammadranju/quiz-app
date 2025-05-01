import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { Toaster } from "react-hot-toast";
import router from "./router/Router";

// const role = localStorage.getItem("role");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            role === "admin" ? <Navigate to="/dashboard" /> : <HomePage />
          }
        />
        <Route
          path="/dashboard2"
          element={
            role === "admin" ? <AdminDashboard /> : <Navigate to="/home" />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter> */}
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </React.StrictMode>
);
