import { useEffect, useCallback } from "react";
import "./index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "@components/header";
import Home from "@pages/home";
import AddCex from "@components/add-cex";
import AddWallet from "@components/add-wallet";
import Loading from "@components/loading";
import Footer from "@components/footer";

import AuthService from "@services/auth";
import clearState from "@utils/clearState";
import { useAppDispatch } from "@store/functions";

const Index = () => {
  const dispatch = useAppDispatch();

  const checkIsAuthenticated = useCallback(async () => {
    try {
      const res = await AuthService.getUserInfo();
      if (res.keyIdentifier) {
        dispatch({
          type: "SET_EVM_ADDRESS",
          payload: {
            data: res.keyIdentifier,
          },
        });
      }
      if (res.ensName) {
        dispatch({
          type: "SET_ENS_NAME",
          payload: {
            data: res.ensName,
          },
        });
      }
      if (res.lastAssetUpdate)
        dispatch({
          type: "SET_LAST_ASSET_UPDATE",
          payload: {
            data: res.lastAssetUpdate,
          },
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
      <Loading />
      <Header />
      <AddWallet />
      <AddCex />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default Index;
