import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuth } from "firebase/auth";

function Protected({ children }) {
  const location = useLocation();
  const auth = getAuth();

  if (auth.currentUser) {
    // If the user is authenticated, render the children components
    return children;
  } else {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default Protected;
