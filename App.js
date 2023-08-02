// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <div className="container-fluid">
          <Navbar />
        </div>
        <div className="container-fluid mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
