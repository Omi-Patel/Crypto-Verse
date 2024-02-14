import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OurModel from "./components/OurModel";
import Coins from "./components/Coins";
import CoinDetails from "./components/CoinDetails";

import Header from "./components/Header";
import Exchanges from "./components/Exchanges";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<OurModel />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/coins/:id" element={<CoinDetails/>} />
          <Route path="/exchanges" element={<Exchanges />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
