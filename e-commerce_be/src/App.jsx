import "./App.css";
import Navbar from "./components/navBar/NavBar";
import StartContainer from "./components/startContainer/StartContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginContainer from "./components/login/LoginContainer";
import Register from "./components/register/Register";
import Context from "./components/context/Context";

function App() {
  return (
    <>
      <BrowserRouter>
        <Context>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<StartContainer />} />
            <Route exact path="/login" element={<LoginContainer />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Context>
      </BrowserRouter>
    </>
  );
}

export default App;
