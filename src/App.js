import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Navbar.js";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './Home';
import { Articles } from './Articles';
import { Algorithms } from './Algorithms';
import { Caeser } from './Algos/Caeser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="algorithms" element={<Algorithms />} />
          <Route path="algorithms/caeser"element={<Caeser/>} />
          </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
