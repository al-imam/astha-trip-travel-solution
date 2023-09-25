import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Addpayment from "./Addpayment";
import Table from "./table";

const Index = () => {
  const [reqList, setReqList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [relod, setRelod] = useState(0);
  const [add, setAdd] = useState(false);

  return (
    <div className="relative w-full pt-5">
      {add ? <Addpayment close={setAdd} /> : ""}
      <div className="relative w-full p-3 ">
        <div className="relative w-full">
          <button
            onClick={() => {
              setAdd(true);
            }}
            className="flex items-center justify-center rounded-md bg-brand-400 py-3 px-5 text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-lg "
          >
            <span className="pr-2 text-2xl">
              <StreamlineMoneyAtmCard2DepositMoneyPaymentFinanceAtmWithdraw />
            </span>
            Add payment
          </button>
        </div>
      </div>
      <Table
        colunm={[
          {
            Header: "Id",
            accessor: "id",
          },
          {
            Header: "Agent",
            accessor: "agent",
            Cell: (props) => {
              return (
                <div>
                  <p className="font-bold ">
                    <span>Name: </span>
                    {props.row.original?.agent?.name}
                  </p>
                  <p>
                    <span>Email: </span>
                    {props.row.original?.agent?.email}
                  </p>
                  <p>
                    <span>Phone: </span>
                    {props.row.original?.agent?.phone}
                  </p>
                </div>
              );
            },
          },
          {
            Header: "Amount",
            accessor: "amount",
          },
          {
            Header: "Transition Id",
            accessor: "transition_id",
          },
          {
            Header: "Note",
            accessor: "message",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Action",
            accessor: "action",
            Cell: (props) => {
              return (
                <div>
                  {props.row.original.status === "canceled" ? (
                    <button className="border-transparent cursor-not-allowed rounded border bg-red-900 py-2 px-4 font-bold text-white">
                      Rejected{" "}
                    </button>
                  ) : (
                    ""
                  )}
                  {props.row.original.status === "submitted" ? (
                    <button className="border-transparent cursor-not-allowed rounded border bg-brand-900 py-2 px-4 font-bold text-white">
                      Approved{" "}
                    </button>
                  ) : (
                    ""
                  )}
                  {props.row.original.status === "pending" ? (
                    <>
                      <button
                        onClick={() => {
                          // accept(`${props.row.original.id}`);
                        }}
                        className="border-transparent rounded border bg-brand-900 py-2 px-4 font-bold text-white hover:bg-brand-800"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          // reject(`${props.row.original.id}`);
                        }}
                        className="border-transparent rounded border bg-red-900 py-2 px-4 font-bold text-white hover:bg-red-800"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              );
            },
          },
        ]}
        datas={reqList}
      />
    </div>
  );
};

export default Index;

export function StreamlineMoneyAtmCard2DepositMoneyPaymentFinanceAtmWithdraw(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 4.5A.5.5 0 0 1 .5 4V1A.5.5 0 0 1 1 .5h12a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5"></path>
        <rect width="7" height="8" x="3.5" y="3" rx=".5"></rect>
        <circle cx="7" cy="7" r="1.5"></circle>
        <path d="M3.5 13.5h7"></path>
      </g>
    </svg>
  );
}
