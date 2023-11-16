import api from "../../apiConfig";

class CategoryAPI {
  static async addNewCategory(categoryName) {
    try {
      const response = await api("POST", "data/add_new_category/", { name: categoryName });
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

  static async getAllCategories() {
    try {
      const response = await api("GET", "/data/get_file_categories/", {});
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

export default CategoryAPI;
