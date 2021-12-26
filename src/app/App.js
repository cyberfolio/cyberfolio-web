import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Home } from "../components/home/Home";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
