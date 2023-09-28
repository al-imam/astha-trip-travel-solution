import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function AgentNavbar({ agent }) {
  const [open, setOpen] = useState(false);
  const logout = async () => {
    try {
      await axios.get("/api/logout");
      document.location.reload();
    } catch (error) {
      console.log("🚀 ~ file: AgentNavbar.jsx:12 ~ logout ~ error:", error);
    }
  };

  return (
    <>
      <nav className="w-full p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link to={"/agent"} className="flex items-center">
            <img src={"/logoastha.png"} alt="Logo" className="mr-2 h-8 w-8" />
            <span className="text-lg font-semibold ">Astha Trip</span>
          </Link>
          <div className="flex items-center gap-10">
            <div>
              <Link
                to={"/agent/visa-application"}
                className="flex cursor-pointer items-center rounded-md bg-brand-300/10 px-10 py-2 ring-brand-400 transition-all duration-300 hover:shadow-md hover:ring-1"
              >
                <span className=" pr-2 text-2xl text-brand-500">
                  {" "}
                  <QuillPaper />
                </span>
                Visa Application Form
              </Link>
            </div>
            <div className="flex items-center gap-1 ">
              <div className="rounded-full bg-brand-50 p-2 text-xl text-brand-500">
                <Fa6SolidBangladeshiTakaSign />
              </div>
              <p className="text-md font-dm font-medium text-gray-800">{agent.balance}</p>
            </div>
            <div onClick={() => setOpen(!open)} className="relative aspect-square w-12">
              <img
                src={agent ? `/api/agent/avatar/${agent?.photo} ` : "/logoastha.png"}
                onError={(evt) => (evt.target.src = "/logoastha.png")}
                alt="User Profile"
                className="aspect-square h-full cursor-pointer rounded-full border border-gray-200 object-cover object-center"
              />

              {open && (
                <div className="absolute right-0 z-10 mt-2 w-[300px] rounded bg-white py-2 px-4 text-sm text-gray-800 shadow-lg">
                  <div className="border-b py-3">
                    <p className=" font-bold text-navy-700 dark:text-white">👋 Hey, {agent.name}</p>
                  </div>
                  <div className="flex flex-col gap-2 py-2">
                    <Link
                      to="/agent/agentProfile"
                      className="rounded bg-brand-500 px-4 py-2 font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="rounded bg-red-500 px-4 py-2 text-left font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div></div>
    </>
  );
}

export default AgentNavbar;

export function Fa6SolidBangladeshiTakaSign(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="0.75em" height="1em" viewBox="0 0 384 512" {...props}>
      <path
        fill="currentColor"
        d="M36 32.2C18.4 30.1 2.4 42.5.2 60S10.5 93.6 28 95.8l7.9 1c16 2 28 15.6 28 31.8V160H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v160c0 53 43 96 96 96h32c106 0 192-86 192-192v-32c0-53-43-96-96-96h-16c-17.7 0-32 14.3-32 32s14.3 32 32 32h16c17.7 0 32 14.3 32 32v32c0 70.7-57.3 128-128 128h-32c-17.7 0-32-14.3-32-32V224h32c17.7 0 32-14.3 32-32s-14.3-32-32-32h-32v-31.5c0-48.4-36.1-89.3-84.1-95.3l-7.9-1z"
      ></path>
    </svg>
  );
}

export function QuillPaper(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <g fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 9h4m-4 7h12m-12 4h12m-12 4h4m-6 5h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2Z"
        ></path>
        <circle cx="22" cy="9" r=".5" fill="currentColor"></circle>
      </g>
    </svg>
  );
}
