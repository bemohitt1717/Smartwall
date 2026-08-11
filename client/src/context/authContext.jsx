// import { createContext, useContext, useState,useEffect } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    setLoading(true);

    try {
      const response = await getProfile();
      setUser(response.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      console.error("[AuthContext] loadProfile failed", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data) => {
    try {
      const response = await updateProfile(data);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loadProfile,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
