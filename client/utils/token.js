class Token {
    get() {
      return window && window.localStorage.getItem("token");
    }
    set(token) {
      window && window.localStorage.setItem("token", token);
    }
    destroy() {
      window.localStorage.removeItem("token");
    }
  }
  
  export default Token;
  
  export const token = new Token();
  