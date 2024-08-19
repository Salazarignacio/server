import "./App.css";
import Navbar from "./components/navBar/NavBar";
import StartContainer from "./components/startContainer/StartContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginContainer from "./components/LoginContainer/LoginContainer";
import Register from "./components/register/Register";
import Context from "./components/context/Context";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import User from "./components/User/User";

function App() {
  return (
    <>
      <BrowserRouter>
        <Context>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<StartContainer />} />
            <Route
              exact
              path="/products/details/:product_id"
              element={<ItemDetailContainer />}
            />

            <Route exact path="/login" element={<LoginContainer />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/user" element={<User />} />
          </Routes>
        </Context>
      </BrowserRouter>
    </>
  );
}

export default App;
