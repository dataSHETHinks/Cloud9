import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const api = async (method, url, data, contentType = "application/json", responseType = "") => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": contentType,
  };

  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      headers,
      responseType
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // Logout function
      }
      throw error;
    }
    if (error.code === "ERR_NETWORK") {
      toast.error("Server did not respond. Contact admin or try again later.");
    }
  }
};

export default api;
