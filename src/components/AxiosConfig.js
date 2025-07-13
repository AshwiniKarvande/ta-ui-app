import axios from "axios";

// Set config defaults when creating the instance
const axiosBaseUrl = axios.create({
    baseURL: 'http://localhost:8001',
    timeout: 12000,
  });

  export default axiosBaseUrl;
// Set config defaults when creating the instance
