import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/Context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const theme = useContext(ThemeContext);
  const { user, setUser } = theme;

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">  <Link to="/" className="text-white hover:text-gray-200">
            My Brand
          </Link></div>
        <div className="space-x-4">
        
          {user.email ? (
          <Link className="text-white hover:text-gray-200" to="/user">  {user.email}</Link>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-200">
              Log In
            </Link>
          )}

          <Link to="/register" className="text-white hover:text-gray-200">
            Register
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-200">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
