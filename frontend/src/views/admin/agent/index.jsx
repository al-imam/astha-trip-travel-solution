import axios from "axios";
import Widget from "components/widget/Widget";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DetailAgentmodule from "./Detail.model";
import Table from "./table";

const Agent = () => {
  const [agentData, SetAgentData] = useState([]);
  const [reload, SetReload] = useState(1);
  const [DetailAgent, SetDetailsAgent] = useState(null);

  const aprove = async (id) => {
    try {
      const resdb = await toast.promise(
        axios.post("/api/agent/approve", {
          id,
        }),
        {
          pending: "please wait for update ",
          success: "approved agent",
          error: "ops Something is Wrong!",
        },
        {
          position: "top-center",
        }
      );
      SetReload((e) => {
        return e + 1;
      });
    } catch (error) {}
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get("/api/admin/get-all-agent");
        SetAgentData(res.data);
      } catch (error) {}
    };
    getdata();
  }, [reload]);

  return (
    <div>
      {DetailAgent ? <DetailAgentmodule dataraw={DetailAgent} close={SetDetailsAgent} reload={SetReload} /> : ""}
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <Widget
          icon={<MaterialSymbolsSupervisedUserCircleOutline className="h-7 w-7" />}
          title={"total Agent"}
          subtitle={agentData.length || "00"}
        />
        <Widget
          icon={<MaterialSymbolsPersonRaisedHandOutline className="h-7 w-7" />}
          title={"Request"}
          subtitle={agentData.filter((e) => e.status === 0).length || "00"}
        />

        <Widget
          icon={<MaterialSymbolsSupervisedUserCircleOutline className="h-7 w-7" />}
          title={"total Agent Approved"}
          subtitle={agentData.filter((e) => e.status === 1).length || "00"}
        />
      </div>
      <div className="relative mt-8 w-full dark:text-white">
        <Table
          colunm={[
            {
              Header: "ID",
              accessor: "id",
            },
            {
              Header: "Identity",
              accessor: "name",
              Cell: (prop) => {
                return (
                  <div>
                    <h1 className="text-xl">{prop.row.original.name}</h1>
                    <p>{prop.row.original.email}</p>
                    <p>{prop.row.original.phone}</p>
                  </div>
                );
              },
            },
            {
              Header: "Nid",
              accessor: "nid_no",
            },
            // {
            //   Header: "Photo",
            //   accessor: "photo",
            // },
            {
              Header: "Date",
              accessor: "createdAt",
              Cell: (prop) => {
                return (
                  <div>
                    <p>
                      <span>Request: </span>
                      {new Date(prop.row.original.createdAt).toDateString()}
                    </p>
                    <p>
                      <span>Last Update: </span>
                      {new Date(prop.row.original.updateAt).toDateString()}
                    </p>
                  </div>
                );
              },
            },
            {
              Header: "Account",
              accessor: "balance",
              Cell: (prop) => {
                return (
                  <div>
                    <p>
                      <span>balance:</span>
                      {prop.row.original.balance}
                    </p>
                    <p>
                      <span>Rate:</span>
                      {prop.row.original.rate}
                    </p>
                  </div>
                );
              },
            },
            {
              Header: "Aprove by",
              accessor: "admin",
            },
            {
              Header: "Action",
              accessor: "email",
              Cell: (prop) => {
                return (
                  <>
                    {+prop.row.original.status ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            SetDetailsAgent(prop.row.original);
                          }}
                          className="flex items-center rounded bg-brand-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                        >
                          <span className="text-xl">
                            <PhAddressBookFill />
                          </span>{" "}
                          details
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            aprove(prop.row.original.id);
                          }}
                          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </>
                );
              },
            },
          ]}
          datas={agentData}
        />
      </div>
    </div>
  );
};

export default Agent;

export function MaterialSymbolsPersonRaisedHandOutline(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M2 23v-2h20v2H2Zm2-3v-6q-.825-1.35-1.275-2.863t-.45-3.087q0-1.525.388-3t.912-2.9q.2-.525.65-.838t1-.312Q6 1 6.55 1.525T7 2.775L6.725 5.05q-.15 1.2.213 2.275t1.087 1.887q.725.813 1.75 1.3T12 11q1.5 0 3.013.313t2.637.887q1.125.575 1.738 1.463T20 15.85V20H4Zm2-2h12v-2.15q0-.6-.3-1.063t-.85-.737q-1.025-.5-2.375-.775T12 13q-1.65 0-3.062-.675t-2.4-1.813Q5.55 9.375 5.05 7.887T4.75 4.8q-.25.75-.363 1.6t-.112 1.65q0 1.45.513 2.788T6 13.45V18Zm6-8q-1.65 0-2.825-1.175T8 6q0-1.65 1.175-2.825T12 2q1.65 0 2.825 1.175T16 6q0 1.65-1.175 2.825T12 10Zm0-2q.825 0 1.413-.588T14 6q0-.825-.588-1.413T12 4q-.825 0-1.413.588T10 6q0 .825.588 1.413T12 8ZM8 20v-.925Q8 17.4 9.163 16.2T12 15h4v2h-4q-.85 0-1.425.613T10 19.075V20H8Zm4-2Zm0-12Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsSupervisedUserCircleOutline(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M10.3 19.8q1.125-2.275 3-3.038T16.5 16q.575 0 1.125.1t1.075.25q.6-.95.95-2.05T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 1.125.287 2.15t.863 1.9q1.025-.5 2.125-.775T9.5 15q.8 0 1.537.138t1.463.362q-.575.3-1.088.7t-.962.85q-.3-.05-.512-.05H9.5q-.8 0-1.588.175T6.4 17.7q.8.8 1.788 1.338t2.112.762ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm-2.5-8.5q-1.45 0-2.475-1.025T6 10q0-1.45 1.025-2.475T9.5 6.5q1.45 0 2.475 1.025T13 10q0 1.45-1.025 2.475T9.5 13.5Zm0-2q.625 0 1.063-.438T11 10q0-.625-.438-1.063T9.5 8.5q-.625 0-1.063.438T8 10q0 .625.438 1.063T9.5 11.5Zm7 3q-1.05 0-1.775-.725T14 12q0-1.05.725-1.775T16.5 9.5q1.05 0 1.775.725T19 12q0 1.05-.725 1.775T16.5 14.5ZM12 12Z"
      ></path>
    </svg>
  );
}

export function PhAddressBookFill(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M160 112a24 24 0 1 1-24-24a24 24 0 0 1 24 24Zm64-72v176a16 16 0 0 1-16 16H64a16 16 0 0 1-16-16v-24H32a8 8 0 0 1 0-16h16v-40H32a8 8 0 0 1 0-16h16V80H32a8 8 0 0 1 0-16h16V40a16 16 0 0 1 16-16h144a16 16 0 0 1 16 16Zm-33.6 123.2a67.88 67.88 0 0 0-27.4-21.69a40 40 0 1 0-53.94 0A67.88 67.88 0 0 0 81.6 163.2a8 8 0 1 0 12.8 9.6a52 52 0 0 1 83.2 0a8 8 0 1 0 12.8-9.6Z"
      ></path>
    </svg>
  );
}
