import "swiper/css";
import "./App.css";
import { Title } from "@mui/icons-material";
import { AppBar, Button } from "@mui/material";
import Header from "./parts/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Provider } from "react-redux";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
