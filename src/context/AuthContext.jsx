import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Attach the access token to every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("yt_access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If a request fails with 401 (expired access token), try to silently
// refresh it once using the refresh token, then retry the original request.
// If the refresh itself fails, log the user out.
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/")) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("yt_refresh_token");

      if (refreshToken) {
        try {
          const res = await axios.post(`${BASE_URL}/auth/refresh`, { refresh_token: refreshToken });
          localStorage.setItem("yt_access_token", res.data.access_token);
          originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("yt_access_token");
          localStorage.removeItem("yt_refresh_token");
          localStorage.removeItem("yt_user");
          window.location.href = "/auth";
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("yt_user");
    return saved ? JSON.parse(saved) : null;
  });

  const storeSession = (data) => {
    localStorage.setItem("yt_access_token", data.access_token);
    localStorage.setItem("yt_refresh_token", data.refresh_token);
    localStorage.setItem("yt_user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (email, password) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    storeSession(res.data);
    return res.data.user;
  };

  const register = async (name, email, password) => {
    const res = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
    storeSession(res.data);
    return res.data.user;
  };

  const forgotPassword = async (email, newPassword) => {
    const res = await axios.post(`${BASE_URL}/auth/forgot`, { email, new_password: newPassword });
    return res.data.message;
  };

  const logout = () => {
    localStorage.removeItem("yt_access_token");
    localStorage.removeItem("yt_refresh_token");
    localStorage.removeItem("yt_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);