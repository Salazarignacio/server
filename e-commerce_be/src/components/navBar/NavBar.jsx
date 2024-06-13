import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/Context";

const Navbar = () => {
  const theme = useContext(ThemeContext);
  const { user, setUser } = theme;

  useEffect(() => {
    fetch("http://localhost:8080/api/sessions/online")
      .then((data) => data.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  console.log(user);
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">MyBrand</div>
        <div className="space-x-4">
          <p>Hola </p>
          <a href="/" className="text-white hover:text-gray-200">
            Home
          </a>
          <a href="/login" className="text-white hover:text-gray-200">
            Log In
          </a>
          <a href="/register" className="text-white hover:text-gray-200">
            Register
          </a>
          <a href="/contact" className="text-white hover:text-gray-200">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
