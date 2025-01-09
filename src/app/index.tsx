import { useEffect, useCallback } from "react";
import "./index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/home";

import AuthService from "services/auth";
import clearState from "utils/clearState";
import { useAppDispatch } from "store/functions";
import AppComponents from "components";

const App = () => {
  const dispatch = useAppDispatch();

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
      clearState();
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
