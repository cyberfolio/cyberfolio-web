import React, { useEffect } from "react";
import "./index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "../components/header";
import Home from "../components/home";
import AddCex from "../components/add-cex";
import AddWallet from "../components/add-wallet";
import Loading from "../components/loading";

import { isAuthenticated } from "../services/auth";
import Actions from "../store/actions";
import clearState from "../utils/clearState";

const Index = () => {
  const dispatch = useDispatch();

  const checkIsAuthenticated = async () => {
    try {
      const res = await isAuthenticated();
      if (res?.keyIdentifier) {
        dispatch({
          type: Actions.SET_EVM_ADDRESS,
          payload: {
            data: res.keyIdentifier,
          },
        });
        dispatch({
          type: Actions.SET_ENS_NAME,
          payload: {
            data: res.ensName ? res.ensName : "",
          },
        });
      } else {
        clearState();
      }
    } catch (e) {
      clearState();
    }
  };

  useEffect(() => {
    checkIsAuthenticated();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </div>
  );
};

export default Index;
