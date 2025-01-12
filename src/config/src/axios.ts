import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Axios = axios.create({
  baseURL,
});

export default Axios;
