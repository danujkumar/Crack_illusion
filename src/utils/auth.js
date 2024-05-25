"use client";
import React, { createContext, useContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [safe, setSafe] = React.useState([]);
  const [reliable, setReliable] = React.useState([]);
  const [efficient, setEfficient] = React.useState([]);
  const [actual, setActual] = React.useState([]);
  const [departure, setDep] = useState({});
  const [arrival, setArr] = useState({});
  const [health, setHealth] = useState({});
  const [mount, setMount] = useState(false);
  const [metrics, setMetrics] = useState({
    speed: "0",
    fuel: "8000",
    altitude: "0",
  });
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });
  const [condition, setCondition] = useState({
    temp: "",
    pressure: "",
    visibility: "",
    wind_speed: "",
    wind_deg: "",
    type: "",
    type_code: 0,
  });

  const situation = (weather) => {
    setCondition(weather);
  };

  const setting = (dep, arr, health, safe, reliable, efficient, actual) => {
    setSafe(safe);
    setReliable(reliable);
    setEfficient(efficient);
    setActual(actual);
    setDep(dep);
    setArr(arr);
    setHealth(health);
  };
  const locate = (lat, lng) => {
    setLocation({ lat: lat, lng: lng });
  };
  const aeroMetrics = (speed, fuel, altitude) => {
    setMetrics({ speed: speed, fuel: fuel, altitude: altitude });
  };
  const mounting = (mount) => {
    setMount(mount);
  };
  return (
    <AuthContext.Provider
      value={{
        setting,
        mounting,
        mount,
        aeroMetrics,
        metrics,
        locate,
        situation,
        condition,
        location,
        safe,
        reliable,
        efficient,
        actual,
        departure,
        arrival,
        health,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
