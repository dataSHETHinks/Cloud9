import api from "../../apiConfig";

class ModuleAPI {
  static async getAllModules() {
    try {
      const response = await api("GET", "data/get_file_modules/", {});
      return {
        success: true,
        response,
        isLogout: false,
      };
    } catch (error) {
      return {
        success: false,
        error,
        isLogout: error.response && error.response.status === 401,
      };
    }
  }

  static async addNewModule(moduleName) {
    try {
      const response = await api("POST", "data/add_new_module/", { name: moduleName });
      return {
        success: true,
        response,
        isLogout: false,
      };
    } catch (error) {
      return {
        success: false,
        error,
        isLogout: error.response && error.response.status === 401,
      };
    }
  }
}

export default ModuleAPI;
