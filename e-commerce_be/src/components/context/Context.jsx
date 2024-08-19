import { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext("");

function Context({ children }) {
  const [user, setUser] = useState({});

  return (
    <>
      <ThemeContext.Provider value={{ user, setUser }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

export default Context;
