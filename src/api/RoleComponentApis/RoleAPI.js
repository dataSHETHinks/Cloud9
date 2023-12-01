import api from "../../apiConfig";

class RoleAPI {
  static async getUserRoles() {
    try {
      const response = await api("GET", "user/get_user_roles/", {});
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
          error: "Plesae login again.",
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

  static async addNewUserRole(title, permissions) {
    try {
      const response = await api("POST", "user/add_new_user_role/", {
        title: title,
        ...permissions,
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

  static async changeAssignedUserRole(userId, roleId) {
    try {
      const response = await api("POST", "user/change_assigned_user_role/", {
        user_id: userId,
        role_id: roleId,
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

export default RoleAPI;
