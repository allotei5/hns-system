import axios from "axios";

const api = axios.create({
    baseURL: "http://35.91.244.64:8000/api/v1/consent/"
})

export default api