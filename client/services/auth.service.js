import axios from "axios";
import client, { BASE_URL } from "../utils/client";

class AuthService {
  static async login(payload) {
    const response = await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);
    return client.post("login", payload);
  }
  static register(payload) {
    return client.post("register", payload);
  }
  static auth() {
    return client.get("profile");
  }
  static logout() {
    return client.post("logout");
  }
  static update(payload) {
    return client.put("profile", payload);
  }
}

export default AuthService;