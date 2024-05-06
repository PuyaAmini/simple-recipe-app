import { createContext } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // custom logics

  return (
    <ThemeContext.Provider value={{ color: "cornflowerblue" }}>
      {children}
    </ThemeContext.Provider>
  );
}
