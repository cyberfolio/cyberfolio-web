import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SideBar } from "../components/sidebar/SideBar";

const App = () => {
  return (
    <div className="app">
      <SideBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

const Home = () => {
  return <h2></h2>;
}

export default App;
