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

const CardDataStats2: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
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
          <h6 className="text-sm mt-2 font-bold text-black dark:text-white">
            Current Risk Level:{" "}
            <span className="text-sm font-medium">
              {/* {title} */}
              Medium
            </span>
          </h6>
          <h6 className="text-sm font-bold mt-2 text-black dark:text-white">
          Alerts:{" "}
            <span className="text-sm font-medium">
            Moderate turbulence expected over Colorado
            </span>
          </h6>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && "text-meta-3"
          } ${levelDown && "text-meta-5"} `}
        >
          {rate}

          {levelUp && (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-meta-5"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats2;
