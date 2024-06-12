import { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext("");

function Context({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/sessions/online")
      .then((data) => data.json())
      .then((data) => {
        setUser(data);
      });
    
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{user, setUser}}>{children}</ThemeContext.Provider>
    </>
  );
}

export default Context;
