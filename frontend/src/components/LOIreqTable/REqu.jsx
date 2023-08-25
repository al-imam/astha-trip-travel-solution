import React, { useEffect, useState } from "react";
import Table from "../../views/public/Entry/ComplexTable";
import Actionbtn from "./Actionbtn";
import axios from "axios";
import exportFromJSON from "export-from-json";
import FilterByAjent from "./FilterByAjent";

const REqu = ({ selectedOption, search, relaod }) => {
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState([]);
  const [reloads, setreload] = relaod;
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/loi/getall");
        setDatas(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/loi/getall");
        setDatas(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, [reloads]);

  useEffect(() => {
    if (!selectedOption) {
      return setShow(datas);
    }
    const filter = datas.filter((data) => data.status === selectedOption);
    setShow(filter);
  }, [selectedOption, datas]);

  useEffect(() => {
    if (!search) {
      return setShow(datas);
    }
    const filter = datas.filter(
      (data) => data.pasport_number.indexOf(search) !== -1
    );
    setShow(filter);
  }, [search, datas]);

  let ExportToExcel = () => {
    const dats = show.map((e) => {
      return {
        id: e.id,
        Guest_Name: e.guest_name,
        Pasport_Number: e.pasport_number,
        Travel_Date: e.travel_date,
        Hotel_Name: e.hotel_name,
        Refarenc: e.reference,
        Agent: `${JSON.parse(e.agent).username} ${
          JSON.parse(e.agent).type === "admin" ? "Admin" : ""
        }`,
        Status: e.status,
      };
    });
    exportFromJSON({
      data: dats,
      fileName: "Data",
      exportType: exportFromJSON.types.xls,
    });
  };

  const [advanced, setAdvanced] = useState(false);

  return (
    <div className="relative w-full">
      <div className="flex w-full justify-between">
        <button
          type="button"
          className=" flex  rounded-md px-4 py-2 font-bold text-brand-500 shadow-md"
          onClick={() => setAdvanced((e) => !e)}
        >
          <span
            className={`text-3xl ${
              advanced ? "-rotate-180" : ""
            } transition-all duration-300`}
          >
            <MaterialSymbolsKeyboardArrowDownRounded />
          </span>
          Advanced Filter
        </button>
        <button
          type="button"
          className=" rounded-md bg-green-500 px-4 py-2 font-bold text-white shadow-md"
          onClick={ExportToExcel}
        >
          Export To Excel
        </button>
      </div>
      {advanced ? (
        <div>
          <FilterByAjent setData={setShow} />
        </div>
      ) : (
        ""
      )}

      <div className="py-2">
        <Table
          columnsData={[
            {
              Header: "Guest Name",
              accessor: "guestName",
              Cell: (prop) => {
                return (
                  <div>
                    <div>{prop.row.original?.guest_name}</div>
                    <div>{prop.row.original?.pasport_number}</div>
                  </div>
                );
              },
            },
            {
              Header: "Travel Date",
              accessor: "travelDate",
              Cell: (prop) => {
                return <div>{prop.row.original?.travel_date}</div>;
              },
            },
            {
              Header: "Country Name",
              accessor: "countryName",
              Cell: (prop) => {
                return <p>{prop.row.original?.country}</p>;
              },
            },
            {
              Header: "File",
              accessor: "passportPhoto",
              Cell: (prop) => {
                return (
                  <div>
                    <div className="flex items-center gap-2">
                      <span>
                        {prop.row.original?.pasport_copy === "" ? (
                          <button
                            title="visa copy available"
                            className="cursor-cell rounded-full border-[1px] border-brand-600/10  bg-red-50 p-1 text-sm  text-red-600"
                          >
                            <IcTwotoneClose />
                          </button>
                        ) : (
                          <button
                            title="visa copy not available"
                            className="cursor-cell rounded-full border-[1px] border-brand-600/10  bg-green-50 p-1 text-sm text-green-600"
                          >
                            <MaterialSymbolsDone />
                          </button>
                        )}
                      </span>
                      <p>password copy</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {prop.row.original?.tiket_copy === "" ? (
                          <button
                            title="visa copy available"
                            className="cursor-cell rounded-full border-[1px] border-brand-600/10  bg-red-50 p-1 text-sm  text-red-600"
                          >
                            <IcTwotoneClose />
                          </button>
                        ) : (
                          <button
                            title="visa copy not available"
                            className="cursor-cell rounded-full border-[1px] border-brand-600/10  bg-green-50 p-1 text-sm text-green-600"
                          >
                            <MaterialSymbolsDone />
                          </button>
                        )}
                      </span>
                      <p>ticket copy</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {prop.row.original?.visa_copy ? (
                          <button
                            title="visa copy available"
                            className="cursor-cell rounded-full border-[1px] border-brand-600/10 bg-green-50 p-1 text-sm text-green-600"
                          >
                            <MaterialSymbolsDone />
                          </button>
                        ) : (
                          <button
                            title="visa copy not available"
                            className="cursor-cell rounded-full border-[1px] border-brand-600/10 bg-red-50 p-1 text-sm text-red-600"
                          >
                            <IcTwotoneClose />
                          </button>
                        )}
                      </span>
                      <p>visa copy</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {prop.row.original?.hotel_copy ? (
                          <button
                            title="visa copy available"
                            className="cursor-cell rounded-full border-[1px] border-brand-600/10 bg-green-50 p-1 text-sm text-green-600"
                          >
                            <MaterialSymbolsDone />
                          </button>
                        ) : (
                          <button
                            title="visa copy not available"
                            className="cursor-cell rounded-full border-[1px] border-brand-600/10 bg-red-50 p-1 text-sm text-red-600"
                          >
                            <IcTwotoneClose />
                          </button>
                        )}
                      </span>
                      <p>hotel copy</p>
                    </div>
                  </div>
                );
              },
            },
            {
              Header: "Agent email",
              accessor: "AgentDate",
              Cell: (prop) => {
                return (
                  <p>
                    {prop.row.original?.agent ? (
                      JSON.parse(prop.row.original?.agent)?.type === "admin" ? (
                        <p className="text-green-500">
                          {JSON.parse(prop.row.original?.agent)?.username}
                        </p>
                      ) : (
                        <p className="text-red-500">
                          {JSON.parse(prop.row.original?.agent)?.username}
                        </p>
                      )
                    ) : (
                      ""
                    )}
                  </p>
                );
              },
            },
            {
              Header: "Status",
              accessor: "status",
            },
            {
              Header: "Action",
              accessor: "action",
              Cell: (prop) => {
                return (
                  <div className="relative">
                    <Actionbtn
                      setShow={setShow}
                      selectedOption={selectedOption}
                      data={datas}
                      setDatas={setDatas}
                      setreload={setreload}
                      prop={prop.row.original}
                    />
                  </div>
                  // <button
                  //   title="delete"
                  //   onClick={() => {
                  //     // deleteList(prop.row.original.id);
                  //   }}
                  //   className="rounded-full border-[1px] border-brand-600/10 bg-brand-50 p-1 text-xl text-red-600 hover:shadow-lg"
                  // >
                  //
                  //   <MaterialSymbolsDeleteOutline />
                  // </button>
                );
              },
            },
          ]}
          tableData={show}
        />
      </div>
    </div>
  );
};

export default REqu;

export function MaterialSymbolsAddNotesOutline(props) {
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
        d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v6.7q-.475-.225-.975-.388T19 11.075V5H5v14h6.05q.075.55.238 1.05t.387.95H5Zm0-3v1V5v6.075V11v7Zm2-1h4.075q.075-.525.238-1.025t.362-.975H7v2Zm0-4h6.1q.8-.75 1.788-1.25T17 11.075V11H7v2Zm0-4h10V7H7v2Zm11 14q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23Zm-.5-2h1v-2.5H21v-1h-2.5V15h-1v2.5H15v1h2.5V21Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsDeleteOutline(props) {
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
        d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsDone(props) {
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
        d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"
      ></path>
    </svg>
  );
}

export function IcTwotoneClose(props) {
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
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsAirplaneTicketOutlineRounded(props) {
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
        d="m11.8 12.9l-2.4.6l-1.075-.8q-.075-.05-.4-.1l-.125.05q-.225.05-.325.263t.025.412l1.15 2q.1.15.25.213t.325.012l8.525-2.25q.375-.1.563-.463t.087-.737q-.1-.375-.437-.562t-.713-.088l-2.45.65l-3.725-3.5q-.125-.125-.3-.162t-.35.012l-.125.025q-.35.075-.488.4t.038.625l1.95 3.4ZM4 20q-.825 0-1.413-.588T2 18v-3.375q0-.275.175-.475t.45-.25q.6-.2.988-.725T4 12q0-.65-.388-1.175t-.987-.725q-.275-.05-.45-.25T2 9.375V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm0-2h16V6H4v2.55q.925.55 1.463 1.463T6 12q0 1.075-.537 1.988T4 15.45V18Zm8-6Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsArrowLeftAltRounded(props) {
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
        d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.85Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsKeyboardArrowDownRounded(props) {
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
        d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z"
      ></path>
    </svg>
  );
}
