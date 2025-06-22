import { useEffect } from "react";
import "./index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/home";

import AuthService from "services/auth";
import AppComponents from "components/index";
import AppUtils from "utils/index";
import AppHooks from "hooks/index";
import AppFeatures from "features/index";

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
      <AppFeatures.Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <AppFeatures.Footer />
    </div>
  );
};

export default App;
