import axios from "axios";

const api = axios.create({
  // baseURL: "https://metri-q-api.vercel.app", 
  baseURL: "http:localhost:4000",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
