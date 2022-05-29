import React, { useCallback, useEffect } from "react";
import "./index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/header";
import Home from "../components/home";
import AddCex from "../components/add-cex";
import AddWallet from "../components/add-wallet";
import Loading from "../components/loading";

import { isAuthenticated } from "../services/auth";
import Actions from "../store/actions";

const Index = () => {
  const dispatch = useDispatch();
  const evmAddress = useSelector(state => state.evmAddress);

  const checkIsAuthenticated = useCallback(async () => {
    try {
      const keyIdentifier = await isAuthenticated();
      if (keyIdentifier) {
        dispatch({
          type: Actions.SET_EVM_ADDRESS,
          payload: {
            data: keyIdentifier,
          },
        });
      } else {
        dispatch({
          type: Actions.SET_EVM_ADDRESS,
          payload: {
            data: "",
          },
        });
      }
    } catch (e) {
      dispatch({
        type: Actions.SET_EVM_ADDRESS,
        payload: {
          data: "",
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if(evmAddress) {
      checkIsAuthenticated();
    }
  }, [evmAddress, checkIsAuthenticated]);

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
