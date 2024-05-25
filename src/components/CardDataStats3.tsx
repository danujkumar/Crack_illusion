import React, { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/utils/auth";
import axios from "axios";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats3: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  const { location, situation } = useAuth();
  const [weather, setWeather] = useState({
    temp: "",
    pressure: "",
    visibility: "",
    wind_speed: "",
    wind_deg: "",
    type: "",
  });
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lng}&appid=dd3508ba7eb1b2b5f26653a552363746`)
      .then((res) => {
        setWeather({
          temp: res.data.current.temp,
          pressure: res.data.current.pressure,
          visibility: res.data.current.visibility,
          wind_speed: res.data.current.wind_speed,
          wind_deg: res.data.current.wind_deg,
          type: res.data.current.weather[0].main,
        });
      })
      .catch((err) => {
        console.log("Weather api error: ", err);
      }).finally(()=>{
        situation(weather);
      });
  }, [location]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-4 py-2 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div> */}

      <div className="mt-1 flex-col items-end justify-between">
        <h6 className="text-md font-bold text-black dark:text-white xl:text-xl">
          {/* {total} */}
          Weather and Environmental Data
        </h6>
        <div className="mt-4 flex-row justify-between">
          <h6 className="mt-2 text-sm font-bold text-black dark:text-white">
            Current Weather:{" "}
            <span className="text-sm font-medium">
              {/* {title} */}
              {weather.type}
            </span>
          </h6>
          <h6 className="mt-2 text-sm font-bold text-black dark:text-white">
            Temperature: <span className="text-sm font-medium">{weather.temp} Kelvin</span>
          </h6>
          <h6 className="mt-2 text-sm font-bold text-black dark:text-white">
            Wind Speed: <span className="text-sm font-medium">{weather.wind_speed} mph</span>
          </h6>
          <h6 className="mt-2 text-sm font-bold text-black dark:text-white">
            Wind Direction: <span className="text-sm font-medium">{weather.wind_deg} deg</span>
          </h6>
          <h6 className="mt-2 text-sm font-bold text-black dark:text-white">
            Visibility: <span className="text-sm font-medium">{weather.visibility}</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats3;
