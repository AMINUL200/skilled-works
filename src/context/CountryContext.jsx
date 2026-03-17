import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/app";

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState(null);
  const [allSettings, setAllSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch settings API once
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/website-settings");
        const settings = res?.data?.data?.settings || [];

        setAllSettings(settings);

        const savedCountry = localStorage.getItem("swcglobalcountry");

        if (savedCountry) {
          setCountry(JSON.parse(savedCountry));
        } else if (settings.length > 0) {
          // 🔥 DEFAULT = Bangladesh
          const defaultCountry =
            settings.find((item) => item.country === "Bangladesh") ||
            settings[0];

          setCountry(defaultCountry);

          localStorage.setItem(
            "swcglobalcountry",
            JSON.stringify(defaultCountry),
          );
        }
      } catch (err) {
        console.error("Settings API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Update country (IMPORTANT)
  const updateCountry = (countryName) => {
    const matched = allSettings.find((item) => item.country === countryName);

    if (matched) {
      setCountry(matched);
      localStorage.setItem("swcglobalcountry", JSON.stringify(matched));
    }
  };

  return (
    <CountryContext.Provider
      value={{
        country,
        allSettings,
        updateCountry,
        loading,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
