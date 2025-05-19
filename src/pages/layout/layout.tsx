import React from "react";
// import { LoginPage } from "../login/login";
import "./layout.css"
import AppRoutes from "../routes/route";

/**
 * Handles Layout of the app
 * 
 * @returns {React.FC}
 */
export const LayoutPage: React.FC = () => {
  return (
    <div className="layout-container">
      <AppRoutes />
    </div>
  );
};
