import api from "../../apiConfig";

class RoleAPI {
    static async getUserRoles() {
        try {
            const response = await api('GET', 'user/get_user_roles/', {});
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


    //permissions sample
    // const permissions = {
    //   "can_modify_module": false,
    //   "can_modify_category": false,
    //   "can_modify_user": false,
    //   "can_modify_files": false,
    //   "can_modify_roles": false
    // };
    static async addNewUserRole(title, permissions) {
        try {
            const response = await api('POST', 'user/add_new_user_role/', {
                "title": title,
                ...permissions,
            });
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

    static async changeAssignedUserRole(userId, roleId) {
        try {
            const response = await api('POST', 'user/change_assigned_user_role/', {
                "user_id": userId,
                "role_id": roleId,
            });
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

export default RoleAPI;
