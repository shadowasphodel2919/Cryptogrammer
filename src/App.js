import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Navbar.js";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Articles } from './Articles';
import { Algorithms } from './Algorithms';
import { Caeser } from './Algos/Caeser';
import { Vignere } from './Algos/Vignere';
import { Playfair } from './Algos/Playfair';
import Atbash from './Algos/Atbash';
import { Railfence } from './Algos/Railfence';
import { Beaufort } from './Algos/Beaufort';
import { RSA } from './Algos/RSA';
import LsbSteganography from './Algos/LsbSteganography';
import { Affine } from './Algos/Affine';

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
          <Route path="algorithms/railfence" element={<Railfence />} />
          <Route path="algorithms/beaufort" element={<Beaufort />} />
          <Route path="algorithms/rsa" element={<RSA />} />
          <Route path="algorithms/affine" element={<Affine />} />
          <Route path="steganography" element={<LsbSteganography />} />
          </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
