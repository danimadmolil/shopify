import "swiper/css";
import "./App.css";
import { Title } from "@mui/icons-material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Header from "./parts/Header";
import LanguageSelector from "./components/LanguageSelector";
import AuthMenu from "./components/AuthMenu";
import Home from "./pages/Home";
import UserContext from "./context/UserContext";
function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <div className="App">
          <Header
            menus={() => [
              <LanguageSelector key={"lang-selector"} />,
              <AuthMenu key={"auth-menu"} />,
            ]}
          ></Header>
          <Routes>
            <Route index path="/" element={<Home />}></Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
