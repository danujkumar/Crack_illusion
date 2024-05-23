import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        className=" relative flex h-10 items-center justify-center  border-[0.5px] border-stroke  hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        href="#"
      >
        <span
          className={`absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>
        <h1 className="text-grey-300 text-xl font-semibold">Select Path</h1>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute mt-2.5 flex h-70 w-xl flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:w-xl ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/#"
            >
              <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-green-400">
                <h1 className="text-2xl text-black">1</h1>
              </div>
              <div className="w-50">
                <h6 className="text-sm font-medium  text-black dark:text-white">
                  This path can be consider safe with Risk Index: 2
                </h6>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/#"
            >
              <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-red">
                <h1 className="text-2xl text-black">2</h1>
              </div>
              <div className="w-50">
                <h6 className="text-sm font-medium  text-black dark:text-white">
                  This path can be consider safe with Risk Index: 5
                </h6>
              </div>
            </Link>
          </li>
          <li>
          <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/#"
            >
              <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-yellow-400">
                <h1 className="text-2xl text-black">3</h1>
              </div>
              <div className="w-50">
                <h6 className="text-sm font-medium  text-black dark:text-white">
                  This path can be consider safe with Risk Index: 5
                </h6>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownMessage;
