import React, { ReactNode } from "react";
import { useAuth } from "@/utils/auth";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats4: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  const {health, metrics} = useAuth();
  return (
    <div className="rounded-sm border border-stroke bg-white px-4 py-2 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div> */}

      <div className="mt-1 flex-col items-end justify-between">
        <h6 className="text-md font-bold text-black dark:text-white xl:text-xl">
          {/* {total} */}
          Flight Health Metrics
        </h6>
        <div className="mt-4 flex-row justify-between">
          <h6 className="mt-2 text-sm font-bold text-black dark:text-white">
            Altitude: <span className="text-sm font-medium">{metrics.altitude} feet</span>
          </h6>
          <h6 className="mt-2 text-sm font-bold text-black dark:text-white">
            Airspeed: <span className="text-sm font-medium">{metrics.speed} miles/h</span>
          </h6>
          <h6 className="mt-2 text-sm font-bold text-black dark:text-white">
            Fuel Level:{" "}
            <span className="text-sm font-medium">{metrics.fuel} gallons</span>
          </h6>
          <h6 className="mt-2 text-sm font-bold text-black dark:text-white">
            Engine Health: <span className="text-sm font-medium">{health.engine_health}</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats4;
