import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "../components/header/Header";
import { Home } from "../components/home/Home";
import { AddCexModal } from "../components/addCexModal/AddCexModal";
import { AddWalletModal } from "../components/addWalletModal/AddWalletModal";

const App = () => {
  return (
    <div className="app">
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
