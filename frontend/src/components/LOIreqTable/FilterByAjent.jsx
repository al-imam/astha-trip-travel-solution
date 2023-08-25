import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import axios from "axios";
import { toast } from "react-toastify";

const FilterByAjent = ({ setData, goBack, removeFilter }) => {
  const [AgentList, SetAgentList] = useState([]);
  const [Agent, SetAgent] = useState(null);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const Filter = async () => {
    try {
      const response = await toast.promise(
        axios.post("/api/admin/filter-loi-by-agent", {
          dateBefore: value.endDate,
          dateAfter: value.startDate,
          email: Agent,
        }),
        {
          loading: "Loading...",
          success: "Success!",
          error: "Error!",
        }
      );
      setData(response.data);
    } catch (error) {
      console.log("🚀 ~ file: FilterByAjent.jsx:24 ~ Filter ~ error:", error);
    }
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get("/api/admin/get-all-agent");
        SetAgentList(
          res.data.filter((e) => {
            return e.status == 1;
          })
        );
      } catch (error) {
        console.log("🚀 ~ getdata ~ error:", error);
      }
    };

    getdata();

    return () => {
      goBack();
      removeFilter();
    };
  }, []);

  return (
    <div className="mt-4 flex w-full flex-col items-start gap-2 sm:justify-between md:flex-row md:items-center lg:justify-start">
      <div className="w-full rounded ring-[2px] ring-brand-300 md:w-96">
        <Datepicker
          onChange={handleValueChange}
          value={value}
          showShortcuts={true}
          popoverDirection="down"
        />
      </div>
      <div className="w-full md:w-72">
        <select
          name="agent"
          onChange={(e) => SetAgent(e.target.value)}
          value={Agent}
          className="h-full w-full rounded-md border-2 border-brand-300 p-2 outline-none "
        >
          <option value="" disabled selected>
            Chouse A Agent Email
          </option>
          {AgentList.map((agent, key) => {
            return (
              <option key={key} value={agent.email}>
                {agent.email}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <button
          onClick={Filter}
          className="ml-0 flex items-center justify-center rounded-md border-2 border-brand-200 bg-white px-6 py-2 sm:ml-auto"
        >
          <span className="text-2xl text-brand-400">
            <IcRoundFilterAlt />
          </span>
          Filter
        </button>
      </div>
    </div>
  );
};

export function IcRoundFilterAlt(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.25 5.61C6.57 8.59 10 13 10 13v5c0 1.1.9 2 2 2s2-.9 2-2v-5s3.43-4.41 5.75-7.39c.51-.66.04-1.61-.8-1.61H5.04c-.83 0-1.3.95-.79 1.61z"
      ></path>
    </svg>
  );
}

export default FilterByAjent;
