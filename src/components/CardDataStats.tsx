"use client"
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

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  const {safe,
    reliable,
    efficient,
    actual,
    departure,
    arrival,
    health} = useAuth();
  return (
    <div className="rounded-sm border border-stroke bg-white px-4 py-2 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div> */}

      <div className="mt-1 flex-col items-end justify-between">
        <h6 className="text-md font-bold text-black dark:text-white xl:text-xl">
          {total}
        </h6>
        <div className="flex-row justify-between mt-4">
          <h6 className="text-sm mt-2 font-bold text-black dark:text-white">
            Flight Number: <span className="text-sm font-medium">6E2775</span>
          </h6>
          <h6 className="text-sm mt-2 font-bold text-black dark:text-white">
          Departure: <span className="text-sm font-medium">{departure.departure}</span>
          </h6>
          <h6 className="text-sm mt-2 font-bold text-black dark:text-white">
          Arrival: <span className="text-sm font-medium">{arrival.arrival}</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
