import React, { useCallback, useEffect } from "react";
import "./index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/header";
import Home from "../components/home";
import AddCex from "../components/add-cex";
import AddWallet from "../components/add-wallet";

import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../services/auth";
import { ACTIONS } from "../store/actions";

const Index = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const checkIsAuthenticated = useCallback(async () => {
    try {
      const keyIdentifier = await isAuthenticated();
      if (keyIdentifier) {
        dispatch({
          type: ACTIONS.SET_EVM_ADDRESS,
          payload: {
            data: keyIdentifier,
          },
        });
      } else {
        dispatch({
          type: ACTIONS.SET_EVM_ADDRESS,
          payload: {
            data: "",
          },
        });
      }
    } catch (e) {
      dispatch({
        type: ACTIONS.SET_EVM_ADDRESS,
        payload: {
          data: "",
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    checkIsAuthenticated();
  }, [checkIsAuthenticated]);

  return (
    <div className="app">
      {loading && <div className="app__blocker" />}
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
