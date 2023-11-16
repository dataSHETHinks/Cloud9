import api from "../../apiConfig";

class AuthAPI {
    static async login(username, password) {
        const data = {
            username,
            password,
        };

        try {
            const response = await api("POST", "/login/", data);
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

    static async logout() {
        try {
            const response = await api("POST", "/logout/");
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

    static async forgotPassword(username) {
        try {
            const response = await api('POST', 'user/forget_password/', {
                "usernameOrEmail": username
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

    static async changePassword(newPassword, fromForgotPassword) {
        try {
            const response = await api('POST', '/user/change_password/', {
                "password": newPassword,
                "fromForgotPassword": fromForgotPassword
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

export default AuthAPI;
