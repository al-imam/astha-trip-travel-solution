import React, { useState, useEffect } from "react";

import Datepicker from "react-tailwindcss-datepicker";

import axios from "axios";
import { toast } from "react-toastify";

const FilterByAjent = ({setData}) => {
  const [AgentList, SetAgentList] = useState([]);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  console.log("🚀 ~ file: FilterByAjent.jsx:14 ~ FilterByAjent ~ value:", value)
  const [Agent,SetAgent] = useState(null);

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };


  const Filter= async() =>{
    try {
        const response = await toast.promise(axios.post('/api/admin/filter-loi-by-agent',{
            dateBefore:value.endDate,
            dateAfter:value.startDate,
            email:Agent
        }),{
            loading: 'Loading...',
            success: 'Success!',
            error: 'Error!'
        })
        setData(response.data)
        
    } catch (error) {
        console.log("🚀 ~ file: FilterByAjent.jsx:24 ~ Filter ~ error:", error)
        
    }
  }

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get("/api/admin/get-all-agent");
        SetAgentList(
          res.data.filter((e) => {
            return e.status == 1;
          })
        );
      } catch (error) {}
    };
    getdata();
  }, []);
  return (
    <div className="mt-2 flex w-full flex-col items-center justify-start gap-2 md:flex-row">
      <div className="w-96">
        <Datepicker
          onChange={handleValueChange}
          value={value}
          showShortcuts={true}
          popoverDirection="down"
        />
      </div>
      <div>
        <select
          name="agent"
          className="h-full w-72 rounded-md border-2 border-brand-300 p-3 outline-none"
        >
          <option value="">Chouse A Agent Email</option>
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
        <button onClick={Filter} className="flex items-center justify-center rounded-md border-2 border-brand-200 bg-white px-5 py-3">
          <span className="text-2xl text-brand-400">
            <IcRoundFilterAlt />
          </span>{" "}
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterByAjent;

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
