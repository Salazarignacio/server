import { useState, createContext, useEffect } from "react";

const ThemeContext = createContext("");

function Context({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/sessions/online")
      .then((data) => data.json())
      .then((data) => {
        setUser(data);
      });
    console.log(user.statusCode);
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{user}}>{children}</ThemeContext.Provider>
    </>
  );
}

export default Context;
