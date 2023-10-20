import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000/';
const token = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${token}`
  },
});

const api = async (method, url, data, contentType = 'application/json') => {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': contentType,
  };

  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // Logout function
      }
      console.log(error);
      throw error;
    }
  }
};

export default api;
