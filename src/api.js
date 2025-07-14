import axios from "axios";

const api = axios.create({
  baseURL: "https://metri-q-api.vercel.app", // ✅ Base path
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
