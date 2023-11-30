import api from "../../apiConfig";

class AuthAPI {
  static async login(username, password) {
    const data = {
      username,
      password,
    };

    try {
      const response = await api("POST", "/login/", data);
      return Promise.resolve({
        success: true,
        response,
        isLogout: false,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return Promise.reject({
          success: false,
          error: "Server did not respond. Contact admin or try again later.",
          isLogout: true,
        });
      } else if (error.response.status === 401) {
        return Promise.reject({
          success: false,
          error: "Please check the credentials.",
          isLogout: true,
        });
      } else if (error.response.status === 500) {
        return Promise.reject({
          success: false,
          error: "Something went wrong. Please check with the admin.",
          isLogout: true,
        });
      } else {
        return Promise.reject({
          success: false,
          error: "Something went wrong.",
          isLogout: true,
        });
      }
    }
  }

  static async logout() {
    try {
      const response = await api("POST", "/logout/");
      return Promise.resolve({
        success: true,
        response,
        isLogout: false,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return Promise.reject({
          success: false,
          error: "Server did not respond. Contact admin or try again later.",
          isLogout: true,
        });
      } else if (error.response.status !== 200) {
        return Promise.reject({
          success: false,
          error: "Something went wrong. Please check with the admin.",
          isLogout: true,
        });
      }
    }
  }

  static async forgotPassword(username) {
    try {
      const response = await api("POST", "user/forget_password/", {
        usernameOrEmail: username,
      });
      return Promise.resolve({
        success: true,
        response,
        isLogout: false,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return Promise.reject({
          success: false,
          error: "Server did not respond. Contact admin or try again later.",
          isLogout: true,
        });
      } else if (error.response.status === 404) {
        return Promise.reject({
          success: false,
          error: "User not found. Please check your username or email.",
          isLogout: true,
        });
      } else {
        return Promise.reject({
          success: false,
          error: "Something went wrong. Please check with admin.",
          isLogout: true,
        });
      }
    }
  }

  static async changePassword(newPassword, fromForgotPassword) {
    try {
      const response = await api("POST", "/user/change_password/", {
        password: newPassword,
        fromForgotPassword: fromForgotPassword,
      });
      return Promise.resolve({
        success: true,
        response,
        isLogout: false,
      });
    } catch (error) {
      return Promise.reject({
        success: false,
        error,
        isLogout: error.response && error.response.status === 401,
      });
    }
  }
}

export default AuthAPI;
