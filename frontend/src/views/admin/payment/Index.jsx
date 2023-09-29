import axios from "axios";
import { useEffect, useState } from "react";
import Addpayment from "./Addpayment";
import Table from "./table";

const Index = () => {
  const [add, setAdd] = useState(false);
  const [payments, setPayments] = useState([]);
  const [Reload, SetReload] = useState(0);

  useEffect(() => {
    axios
      .get("/api/payment/")
      .then((res) => setPayments(res.data))
      .catch(console.log);
  }, [Reload]);

  return (
    <div className="relative w-full pt-5 ">
      {add ? <Addpayment close={() => setAdd(false)} ReaLoad={SetReload} /> : ""}
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
            accessor: "agent_email",
          },
          {
            Header: "Amount",
            accessor: "amount",
            Cell: (prop) => (
              <span className="flex items-center gap-1">
                {prop.row.original.rate * prop.row.original.amount}{" "}
                <span className="relative -top-[2px]">
                  <StreamlineMoneyWalletMoneyPaymentFinanceWallet />
                </span>
              </span>
            ),
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
            Header: "Date",
            accessor: "createdAt",
            Cell: (prop) => {
              return (
                <span>
                  {new Date(prop.row.original.createdAt).toLocaleDateString(
                    {},
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </span>
              );
            },
          },
          // {
          //   Header: "Action",
          //   accessor: "action",
          //   Cell: (props) => {
          //     return <button className="rounded bg-brand-400 px-2 py-1 text-white">Details</button>;
          //   },
          // },
        ]}
        datas={payments}
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

export function StreamlineMoneyWalletMoneyPaymentFinanceWallet(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7.5v-2a1 1 0 0 0-1-1H1.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1H11a1 1 0 0 0 1-1V10M3.84 2L9.51.52a.49.49 0 0 1 .61.36L10.4 2"></path>
        <rect width="3.5" height="2.5" x="10" y="7.5" rx=".5"></rect>
      </g>
    </svg>
  );
}
