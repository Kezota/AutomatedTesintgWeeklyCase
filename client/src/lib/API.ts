import axios from "axios";
import { API_URL } from "./config";

export const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (request.headers) {
        request.headers.Authorization = `Bearer ${token}`;
      } else {
        request.headers = {
          Authorization: `Bearer ${token}`,
        } as Record<string, string>;
      }
    }

    return request;
  },
  (error) => Promise.reject(error)
);
