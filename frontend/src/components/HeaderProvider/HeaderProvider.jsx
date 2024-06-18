import React, { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

const HeaderProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(window.location.pathname === '/news');

  return (
    <HeaderContext.Provider value={{ isClicked, setIsClicked }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);

export { HeaderProvider };
