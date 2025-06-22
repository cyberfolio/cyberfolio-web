import { useEffect } from "react";
import "./index.module.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/home";

import AuthService from "services/auth";
import AppComponents from "components";
import AppUtils from "utils";
import AppHooks from "hooks";

const App = () => {
  const dispatch = AppHooks.useAppDispatch();

  useEffect(() => {
    const checkIsAuthenticated = async () => {
      try {
        const res = await AuthService.getUserInfo();
        if (res.keyIdentifier) {
          dispatch({
            type: "SET_EVM_ADDRESS",
            payload: res.keyIdentifier,
          });
        }
        if (res.ensName) {
          dispatch({
            type: "SET_ENS_NAME",
            payload: res.ensName,
          });
        }
        if (res.lastAssetUpdate)
          dispatch({
            type: "SET_LAST_ASSET_UPDATE",
            payload: res.lastAssetUpdate,
          });
      } catch (e) {
        AppUtils.clearState();
      }
    };
    checkIsAuthenticated();
  }, [dispatch]);

  return (
    <div className="app">
      <AppComponents.Loading />
      <AppComponents.Header />
      <AppComponents.AddWallet />
      <AppComponents.AddCex />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <AppComponents.Footer />
    </div>
  );
};

export default App;
