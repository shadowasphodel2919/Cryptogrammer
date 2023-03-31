import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Navbar.js";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './Home';
import { Articles } from './Articles';
import { Algorithms } from './Algorithms';
import { Caeser } from './Algos/Caeser';
import { Vignere } from './Algos/Vignere';
import { Playfair } from './Algos/Playfair';
import Atbash from './Algos/Atbash';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Articles />} />
          <Route path="articles" element={<Articles />} />
          <Route path="algorithms" element={<Algorithms />} />
          <Route path="algorithms/caeser"element={<Caeser/>} />
          <Route path="algorithms/vignere"element={<Vignere/>} />
          <Route path="algorithms/playfair"element={<Playfair/>} />
          <Route path="algorithms/atbash" element={<Atbash />} />
          </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
