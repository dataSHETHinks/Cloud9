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
            return Promise.reject({
                success: false,
                error,
                isLogout: error.response && error.response.status === 401,
            });
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
            return Promise.reject({
                success: false,
                error,
                isLogout: error.response && error.response.status === 401,
            });
        }
    }

    static async forgotPassword(username) {
        try {
            const response = await api('POST', 'user/forget_password/', {
                "usernameOrEmail": username
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

    static async changePassword(newPassword, fromForgotPassword) {
        try {
            const response = await api('POST', '/user/change_password/', {
                "password": newPassword,
                "fromForgotPassword": fromForgotPassword
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
