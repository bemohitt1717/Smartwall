import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import Loader from "../components/common/Loader.jsx";

export default function ProtectedRoute() {
  const { loading, user } = useAuth();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Intentionally show loader for minimum 2 seconds for smooth UX
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show loader if auth is loading OR if intentional delay is active
  if (loading || showLoader) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}