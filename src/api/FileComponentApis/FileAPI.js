import api from "../../apiConfig";

class FileAPI {
    static async listAllFiles() {
        try {
            const response = await api("GET", "/data/get_file_names/", {});
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

    static async getFileData(fileId) {
        try {
            const response = await api("GET", `/data/get_file_data/?id=${fileId}`);
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

    static async uploadFile(selectedFile, selectedCategory, selectedModule) {
        if (selectedFile && selectedCategory && selectedModule) {
            try {
                const fileType = selectedFile.name.split(".").pop().toLowerCase();
                const fileNameWithoutExtension = selectedFile.name.split(".")[0];

                const formData = new FormData();
                formData.append("uploaded_file", selectedFile);
                formData.append("file_category", selectedCategory.id);
                formData.append('file_module', selectedModule.id);
                formData.append("file_name", fileNameWithoutExtension);
                formData.append("file_type", fileType);

                const response = await api("POST", "/data/upload_file/", formData, "multipart/form-data");

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
        } else {
            return {
                success: false,
                error: "Invalid file, category or module",
                isLogout: false,
            };
        }
    }
}

export default FileAPI;
