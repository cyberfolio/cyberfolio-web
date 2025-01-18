import { useEffect, useCallback } from "react";
import "./index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/home";

import AuthService from "services/auth";
import AppComponents from "components";
import AppUtils from "utils";
import AppHooks from "hooks";

const App = () => {
  const dispatch = AppHooks.useAppDispatch();

  const checkIsAuthenticated = useCallback(async () => {
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
  }, [dispatch]);

  useEffect(() => {
    checkIsAuthenticated();
  }, [checkIsAuthenticated]);

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
