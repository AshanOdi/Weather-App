import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [units, setUnits] = useLocalStorage("settings_units", "metric");

  const toggleUnits = () =>
    setUnits((prev) => (prev === "metric" ? "imperial" : "metric"));

  return (
    <SettingsContext.Provider value={{ units, toggleUnits }}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  return useContext(SettingsContext);
}
