import axios from "axios";
import { token } from "./token";

const client = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${token.get()}`;
  return req;
});

client.interceptors.response.use((res) => res.data);

export default client;
