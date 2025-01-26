import Cookie from "js-cookie";
import axios from "axios";

const API_URL = "https://reservation-3b8ed-default-rtdb.firebaseio.com";

axios.defaults.baseURL = API_URL;

/* init axios and add token for all requests */
axios.interceptors.request.use(
  (config) => {
    /* const token = Cookie.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;