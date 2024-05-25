import React, { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/utils/auth";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats2: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  const { condition } = useAuth();
  // console.log(condition);
  //Risk calculation here
  //weightage
  const weightage = {
    temp: 0.05,
    visibility: 0.3,
    type: 0.05,
    wind_speed: 0.2,
    precipitation: 0.25,
    altitude: 0.05,
  };

  const [riskk, setRiskk] = useState(0.0);

  useEffect(() => {
    //Calculation of seperate
    let sky_condition = 0;
    if (
      Number.parseInt(condition.type_code) >= 200 &&
      Number.parseInt(condition.type_code) <= 232
    ) {
      sky_condition = 3;
    } else if (
      Number.parseInt(condition.type_code) >= 300 &&
      Number.parseInt(condition.type_code) <= 321
    ) {
      sky_condition = 3;
    } else if (
      Number.parseInt(condition.type_code) >= 500 &&
      Number.parseInt(condition.type_code) <= 531
    ) {
      sky_condition = 3;
    } else if (
      Number.parseInt(condition.type_code) >= 600 &&
      Number.parseInt(condition.type_code) <= 622
    ) {
      sky_condition = 3;
    } else if (
      Number.parseInt(condition.type_code) >= 701 &&
      Number.parseInt(condition.type_code) <= 781
    ) {
      sky_condition = 3;
    } else if (Number.parseInt(condition.type_code) == 800) {
      sky_condition = 0;
    } else if (Number.parseInt(condition.tyep_code) > 800) {
      sky_condition = 2;
    }

    const final_value = {
      ftemp: weightage.temp * (Number.parseFloat(condition.temp) - 273.15),
      fvisibility:
        weightage.visibility *
        (Number.parseFloat(condition.visibility) * 0.621371),
      fwind_speed:
        weightage.wind_speed *
        (Number.parseFloat(condition.wind_speed) * 1.94384),
      ftype: weightage.type * sky_condition,
    };
    let risk_score =
      weightage.temp * final_value.ftemp +
      weightage.visibility * final_value.fvisibility +
      weightage.type * final_value.ftype +
      weightage.wind_speed * final_value.fwind_speed;
    
    setRiskk(risk_score);
    console.log(risk_score);
  }, [condition]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-4 py-2 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div> */}

      <div className="mt-1 flex-col items-end justify-between">
        <h6 className="text-md font-bold text-black dark:text-white xl:text-xl">
          {/* {total} */}
          Risk and Alerts
        </h6>
        <div className="mt-4 flex-row justify-between">
          <h6 className="mt-2 text-sm font-bold text-black dark:text-white">
            Current Risk Level:{" "}
            <span className="text-sm font-medium">
              {/* {title} */}
              {riskk/100}
            </span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats2;
