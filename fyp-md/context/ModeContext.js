// context/ModeContext.js
import React, { createContext, useContext, useState } from "react";

const ModeContext = createContext();

export function ModeProvider({ children }) {
  const [mode, setMode] = useState("drill"); // default mode

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  return useContext(ModeContext);
}
