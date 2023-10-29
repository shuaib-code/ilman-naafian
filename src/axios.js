import axios from "axios";

const axiosClient = axios.create(
    {
        baseURL:'https://ilman-naafian-j1vgz4qm4-mohammad-shuaibs-projects.vercel.app'
    }
);

export default axiosClient;