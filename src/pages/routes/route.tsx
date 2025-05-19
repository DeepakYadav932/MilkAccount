import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import { LoginPage } from "../login/login";
import ProtectedRoute from "../protected-route/protected-route";
import { NavigateTo } from "../../components/navigation/navigation";
import { Record } from "../dashboard/Record/record";
import { Sales } from "../dashboard/Sales/sales";

/**
 * Handles routes of the application
 * @returns {React.FC}
 */
const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<NavigateTo to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<NavigateTo to="/dashboard/records" />} />
            <Route path="records" element={<Record />} />
            <Route path="sales" element={<Sales />} />
          </Route>
        </Route>

        {/* Catch-all for undefined routes */}
        
        {/* TODO: to style the not found page */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
