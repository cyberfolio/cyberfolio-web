import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { SideBar } from "../components/sidebar/SideBar";

const App = () => {
  return (
    <div>
      <SideBar />
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

const Home = () => {
  return <h2>Home</h2>;
}

export default App;
