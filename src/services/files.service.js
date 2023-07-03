import axios from "axios";
import authHeader from "./auth-header";


const API_URL = 'http://localhost:8082/file/';

class FilesService {

    uploadFile(formData) {
        return axios.post(API_URL + "uploadFile", formData, {headers: authHeader()});
    }

    downloadFile(fileId) {
        return axios.get(API_URL + "downloadFile/" + fileId, {headers: authHeader(), responseType: 'blob'})
    }

}

export default new FilesService();