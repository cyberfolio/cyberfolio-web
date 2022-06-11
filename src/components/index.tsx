import { useEffect } from "react";
import "./index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./header";
import Home from "./home";
import AddCex from "./add-cex";
import AddWallet from "./add-wallet";
import Loading from "./loading";

import { isAuthenticated } from "../services/auth";
import clearState from "../utils/clearState";
import { useAppDispatch } from "../hooks";

const Index = () => {
  const dispatch = useAppDispatch();

  const checkIsAuthenticated = async () => {
    try {
      const res = await isAuthenticated();
      if (res?.keyIdentifier) {
        dispatch({
          type: "SET_EVM_ADDRESSs",
          payload: {
            data: res.keyIdentifier,
          },
        });
        dispatch({
          type: "SET_ENS_NAME",
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
