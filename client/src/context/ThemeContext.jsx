import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const lastUpdatedTheme = localStorage.getItem("theme") || "light";
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lastUpdatedTheme);

  // Apply theme to <html> or <body>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
