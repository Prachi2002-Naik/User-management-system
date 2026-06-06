import axios from "axios";

const api = axios.create({
  baseURL: "https://user-management-system-lkzz.onrender.com/api",
});

export default api;