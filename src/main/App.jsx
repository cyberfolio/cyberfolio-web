import React, { useCallback, useEffect } from "react";
import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "../components/header/Header";
import { Home } from "../components/home/Home";
import { AddCexModal } from "../components/add-cex/AddCexModal";
import { AddWalletModal } from "../components/add-wallet/AddWalletModal";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../services/auth";
import { ACTIONS } from "../state/actions";

const App = () => {
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
      <AddWalletModal />
      <AddCexModal />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
