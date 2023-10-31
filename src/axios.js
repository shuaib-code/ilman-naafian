import axios from "axios";

const axiosClient = axios.create(
    {
        baseURL:'https://ilman-naafian.vercel.app'
        // baseURL: 'http://localhost:5000'
    }
);

export default axiosClient;