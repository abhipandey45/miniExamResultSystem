import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token automatically
API.interceptors.request.use((req) => {

  const adminInfo = localStorage.getItem(
    "adminInfo"
  );

  if (adminInfo) {
    const token = JSON.parse(adminInfo).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;