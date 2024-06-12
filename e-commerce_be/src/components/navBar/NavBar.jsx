import { useContext } from "react";
import { ThemeContext } from "../context/Context";
const Navbar = () => {
  const theme = useContext(ThemeContext)
  const {user} = theme
  console.log(user);
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">MyBrand</div>
        <div className="space-x-4">
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
