import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

const useAxiosSecure = () => {
  useEffect(() => {
    // Optional: Add request/response interceptors if needed
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
