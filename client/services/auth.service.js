import client from "../utils/client";

class AuthService {
  static login(payload) {
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
