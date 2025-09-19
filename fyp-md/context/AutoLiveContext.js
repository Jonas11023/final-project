// context/AutoLiveContext.js
import React, { createContext, useContext, useState } from "react";

const AutoLiveContext = createContext();

export function AutoLiveProvider({ children }) {
  const [autoLive, setAutoLive] = useState(false);

  return (
    <AutoLiveContext.Provider value={{ autoLive, setAutoLive }}>
      {children}
    </AutoLiveContext.Provider>
  );
}

export function useAutoLive() {
  const context = useContext(AutoLiveContext);
  if (!context) {
    throw new Error("useAutoLive must be used within an AutoLiveProvider");
  }
  return context;
}