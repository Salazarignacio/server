import "./App.css";
import Navbar from "./components/navBar/NavBar";
import StartContainer from "./components/startContainer/StartContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
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
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Context>
      </BrowserRouter>
    </>
  );
}

export default App;
