<<<<<<< HEAD
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

=======
import { useContext } from "react";
import { ThemeContext } from "../context/Context";
const Navbar = () => {
  const theme = useContext(ThemeContext)
  const {user} = theme
>>>>>>> 106d72c443d97a1279a92d08a411263e6e9fda61
  console.log(user);
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">MyBrand</div>
        <div className="space-x-4">
<<<<<<< HEAD
          <p>Hola </p>
=======
>>>>>>> 106d72c443d97a1279a92d08a411263e6e9fda61
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
