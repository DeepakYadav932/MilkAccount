import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import localStorageService from "../../services/local-storage/local-storage";
import { NavigationPath } from "../../constants/navigation-paths";
// import { NavigateTo } from "../../components/navigation/navigation";


const isAuthenticated: boolean = () => {
  return localStorageService.isAuthenticated()
};

/**
 * Parent component of all those pages which are protected and requires authorization
 * if authentication is not successful, sends the user back to login
 * @returns {React.FC}
 */
const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate()
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login
    navigate(NavigationPath.LOGIN)
  }

  // If authenticated, render the child routes
  return <Outlet />
};

export default ProtectedRoute;
