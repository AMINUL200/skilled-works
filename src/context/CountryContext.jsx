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
        const res = await api.get("/website-settings"); // change endpoint if needed
        const settings = res?.data?.data?.settings || [];

        setAllSettings(settings);

        // Check localStorage
        const savedCountry = localStorage.getItem("swcglobalcountry");

        if (savedCountry) {
          setCountry(JSON.parse(savedCountry));
        } else if (settings.length > 0) {
          // Default → first country (or India if you want)
          setCountry(settings[0]);
          localStorage.setItem(
            "swcglobalcountry",
            JSON.stringify(settings[0])
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
    const matched = allSettings.find(
      (item) => item.country === countryName
    );

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