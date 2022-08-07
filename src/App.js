import { Title } from "@mui/icons-material";
import { AppBar, Button } from "@mui/material";
import { supabase } from "./services/auth/supbaseAuth";
import "./App.css";
import Header from "./parts/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
function App() {
  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;
