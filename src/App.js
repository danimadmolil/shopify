import { Title } from "@mui/icons-material";
import { AppBar, Button } from "@mui/material";

import "./App.css";
import Header from "./parts/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Routes>
          {/* <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
