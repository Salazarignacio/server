import "./App.css";
import Navbar from "./navBar/NavBar";
import StartContainer from "./startContainer/StartContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<StartContainer />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
