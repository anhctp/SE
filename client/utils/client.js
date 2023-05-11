import axios from "axios";
import { token } from "./token";
export const BASE_URL = "http://localhost:8000";

const client = axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

client.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${token.get()}`;
  return req;
});

client.interceptors.response.use((res) => res.data);

export default client;

function getCSRFToken() {
  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="));
  console.log(document.cookie);
  if (cookieValue) {
    console.log(cookieValue.split("=")[1]);
    return cookieValue.split("=")[1];
  }

  return null;
}