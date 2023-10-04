/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span className="absolute top-4 right-4 block cursor-pointer xl:hidden" onClick={onClose}>
        <HiX />
      </span>

      <div className={`mx-[56px] my-5 flex items-center justify-center`}>
        <div className="relative mt-1 ml-1 h-20 ">
          <img src="/logoastha.png" alt="Astha trip" className="h-full" />
        </div>
      </div>
      <div className=" mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Free Horizon Card */}
      <div className="flex justify-center text-center">
        {/* <SidebarCard /> */}
        <p className="text-sm font-light ">
          All Right Reserved to Astha Trip
          <br />
          {/* <span className="w-full relative text-center">Developed by Dewan ICT</span> */}
        </p>
      </div>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
