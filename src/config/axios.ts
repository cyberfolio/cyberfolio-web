import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const mainInstance = axios.create({
  baseURL,
});
