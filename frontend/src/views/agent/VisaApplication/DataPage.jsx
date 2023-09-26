import React, { useMemo, useState } from "react";
import Select from "react-select";
import Table from "../../admin/BalanceReq/table";
import useVisa from "../Hooks/useVisa";
const StyleSelect = {
  control: (styles, state) => ({
    ...styles,
    margin: 0,
    padding: 2,
    backgroundColor: "rgb(248 249 250)",
    borderColor: state.isFocused ? "rgb(59 130 246 / 0.5)" : state.isDisabled ? "rgb(233 227 255)" : "rgb(192 184 254)",
    borderWidth: 1.5,
    opacity: state.isDisabled ? "0.5" : 1,
    "&:hover": {
      borderColor: "none",
    },
    boxShadow: state.isFocused ? "0 0 0 1px rgb(59 130 246 / 0.5)" : "none",
  }),
  placeholder: (styles) => ({
    ...styles,
    whiteSpace: "nowrap",
    fontSize: "0.875rem",
    overflow: "hidden",
    color: "#adb5bd",
    letterSpacing: "0.3px",
    userSelect: "none",
  }),
  valueContainer: (styles) => ({
    ...styles,
    userSelect: "none",
    color: "rgb(27 37 89)",
  }),
};
const DataPage = () => {
  const [SelectedCountry, SetSelectedCountry] = useState("");
  const [data, Loading, error, reload] = useVisa();
  const [TableData, SetTableData] = useState([]);
  // colunm
  const colunm = useMemo(() => {
    let allData = {
      schengen: [
        {
          Header: "ID",
          accessor: "id", // accessor is the "key" in the data
        },
        {
          Header: "Name",
          accessor: "name",
          Cell: (prop) => {
            return prop.row.original.surname + " " + prop.row.original.first_name;
          },
        },
        {
          Header: "Passport Number",
          accessor: "passport_number",
        },
        {
          Header: "Passport Type",
          accessor: "type_of_travel_document",
        },

        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Action",
          accessor: "action",
          Cell: (prop) => <Action props={{ ...prop, county: "Singapore" }} />,
        },
      ],
      thailand: [
        {
          Header: "ID",
          accessor: "id", // accessor is the "key" in the data
        },
        {
          Header: "Name",
          accessor: "name",
          Cell: (prop) => {
            return prop.row.original.first_name + " " + prop.row.original.middle_name;
          },
        },
        {
          Header: "Passport Number",
          accessor: "passport_number",
        },
        {
          Header: "Passport Type",
          accessor: "type_of_passport",
        },

        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Action",
          accessor: "action",
          Cell: (prop) => <Action props={{ ...prop, county: "Singapore" }} />,
        },
      ],
      singapore: [
        {
          Header: "ID",
          accessor: "id", // accessor is the "key" in the data
        },
        {
          Header: "Name",
          accessor: "name",
          Cell: (prop) => {
            return prop.row.original.name + " " + prop.row.original.alias;
          },
        },
        {
          Header: "Passport Number",
          accessor: "passport_number",
        },
        {
          Header: "Travel Date",
          accessor: "expected_date_of_arrival",
        },

        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Action",
          accessor: "action",
          Cell: (prop) => <Action props={{ ...prop, county: "Singapore" }} />,
        },
      ],
    };
    if (SelectedCountry === "singapore") {
      SetTableData(data.Singapore);
      return allData.singapore;
    }
    if (SelectedCountry === "thailand") {
      SetTableData(data.Thailand);
      return allData.thailand;
    }
    if (SelectedCountry === "schengen") {
      SetTableData(data.Schengen);
      return allData.schengen;
    }
    return allData.singapore;
  }, [SelectedCountry]);
  return (
    <div className="relative w-full ">
      <div className="relative w-full p-3 pb-6">
        <div>
          <span className="relative w-full text-xl">Select A Country</span>
          <Select
            isSearchable={false}
            styles={StyleSelect}
            placeholder={"Please Select a Country"}
            onChange={(e) => {
              SetSelectedCountry(e.value);
            }}
            options={["singapore", "thailand", "schengen"].map((e) => {
              return { label: e, value: e };
            })}
          />
        </div>
      </div>
      <div>
        <Table colunm={colunm} datas={TableData} />
      </div>
    </div>
  );
};

export default DataPage;

const Action = ({ props }) => {
  return (
    <div className="flex justify-end gap-2">
      {props.row.original.status !== "approved" ? (
        "wait"
      ) : (
        <a
          target="_blank"
          href={`/api/visa-form/download-form-pdf-${props.county}/${props.row.original.id}`}
          title="Download"
          className="rounded-full bg-blue-200 p-1 text-xl text-brand-900 ring-1 ring-brand-900 transition-all duration-300 hover:scale-105 hover:shadow-md"
          rel="noreferrer"
        >
          <LineMdDownloadingLoop />
        </a>
      )}
    </div>
  );
};

export function LineMdDownloadingLoop(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
        <path
          strokeDasharray="2 4"
          strokeDashoffset="6"
          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
        >
          <animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0"></animate>
        </path>
        <path strokeDasharray="30" strokeDashoffset="30" d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3">
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.3s" values="30;0"></animate>
        </path>
        <path strokeDasharray="10" strokeDashoffset="10" d="M12 8v7.5">
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0"></animate>
        </path>
        <path strokeDasharray="6" strokeDashoffset="6" d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5">
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0"></animate>
        </path>
      </g>
    </svg>
  );
}
