import axios from "axios";

const mainBackendURL = import.meta.env.VITE_BACKEND_URL;

const MainBackend = axios.create({
  baseURL: mainBackendURL,
});

const AppConfigs = {
  MainBackend,
};

export default AppConfigs;
