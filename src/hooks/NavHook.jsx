import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [selected, setSelected] = useState("Calculator");

  return (
    <NavContext.Provider value={{ selected, setSelected }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => {
  return useContext(NavContext);
}
