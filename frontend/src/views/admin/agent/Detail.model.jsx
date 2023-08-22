import React, { useEffect, useState } from "react";
import Widget from "components/widget/Widget";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin();

const DetailAgentmodule = ({ dataraw, close, reload }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(dataraw);
  }, [dataraw]);

  const [inpbal, setInpbal] = useState(0);

  // const add valence
  const AddBal = async () => {
    try {
      let url = "/api/admin/add-balance";
      const res = await toast.promise(
        axios.post(url, {
          id: `${data.id}`,
          balance: inpbal,
        }),
        {
          pending: "Wait please !",
          success: "Balance added successfully",
          error: "Something went wrong",
        }
      );
      reload((old) => old + 1);
      close(false);
    } catch (error) {
      console.log("🚀 ~ file: Detail.model.jsx:11 ~ AddBal ~ error:", error);
    }
  };

  const [inpRate, setInprate] = useState(0);
  // const add rate
  const setRate = async () => {
    try {
      let url = "/api/admin/setrate";
      const res = await toast.promise(
        axios.post(url, {
          id: `${data.id}`,
          rate: inpRate,
        }),
        {
          pending: "Wait please !",
          success: "Balance added successfully",
          error: "Something went wrong",
        }
      );
      reload((old) => old + 1);
      close(false);
    } catch (error) {
      console.log("🚀 ~ file: Detail.model.jsx:11 ~ AddBal ~ error:", error);
    }
  };

  function blockAgent() {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `You want to block ${data.name}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Block!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        confirmButtonColor: "#ff0000db",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post("/api/admin/block-agent", { id: data.id });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Agent has been activated.",
              showConfirmButton: false,
              timer: 1000,
            });
            reload((old) => old + 1);
            close(false);
          } catch (error) {
            console.log(error);
          }
        }
      });
  }

  function unblockAgent() {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `You want to unblock ${data.name}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Unblock!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post("/api/admin/unblock-agent", { id: data.id });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Agent has been blocked.",
              showConfirmButton: false,
              timer: 1000,
            });
            reload((old) => old + 1);
            close(false);
          } catch (error) {
            console.log(error);
          }
        }
      });
  }

  return (
    <div className="remove-scroll-bar fixed top-0 left-0 z-10 h-screen  w-full overflow-auto bg-white/60 pt-48 backdrop-blur-md ">
      {data ? (
        <div className="mx-2 mb-8 w-full rounded-md bg-brand-100 p-3 shadow-md md:mx-auto md:w-11/12">
          <div className="relative flex w-full items-center justify-between border-b-2 border-brand-600 p-3 text-xl font-bold text-white">
            <div className="flex items-center">
              <span className="pr-2 text-2xl text-brand-700">
                <PhUserBold />
              </span>{" "}
              Agent Details
            </div>
            <div>
              <button
                onClick={() => {
                  close(false);
                }}
                className="rounded-md border-2 border-red-500 px-4 py-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
              >
                close
              </button>
            </div>
          </div>
          <div className="grid w-full grid-cols-2">
            {/* side a  */}
            <div className="relative col-span-2 w-full md:col-span-1">
              <div className="px-2 pt-2 text-xl font-bold">
                <span>Name</span>: <span>{data.name}</span>
              </div>
              <div className="px-2 text-lg font-light">
                <span>Email</span>: <span>{data.email}</span>
              </div>
              <div className="px-2 text-lg font-light">
                <span>phone</span>: <span>{data.phone}</span>
              </div>
              <div className="px-2 text-lg font-light">
                <span>NID</span>: <span>{data.nid_no}</span>
              </div>
            </div>
            {/* side b  */}
            <div className="relative col-span-2 w-full md:col-span-1">
              <div className="flex items-center px-2 pt-2 text-xl font-bold">
                <span>Approve By </span>:{" "}
                <span className="flex items-center">
                  <span className="px-2">
                    <PhThumbsUp />
                  </span>{" "}
                  {data.admin}
                </span>
              </div>
              <div className="px-2 text-lg font-light ">
                <Widget
                  icon={<PhMoneyBold className="h-7 w-7" />}
                  title={`Rate:${data.rate}`}
                  subtitle={`balance: ${data.balance}`}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="relative w-full">
              <div className="relative flex w-full items-center border-b-2 border-brand-600 p-3 text-xl font-bold text-white">
                <span className="pr-2 text-2xl text-brand-700">
                  <BytesizeSettings />
                </span>{" "}
                Agent setting
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className=" p-2">
                  <div className="relative w-full">
                    <h1>Add Balance to Agent Account</h1>
                    <input
                      onChange={(e) => {
                        setInpbal(e.target.value);
                      }}
                      value={inpbal}
                      type="number"
                      placeholder="Enter The Ammount"
                      className="rounded-md p-2 shadow-sm"
                    />
                    <br />
                    <button
                      onClick={() => {
                        AddBal();
                      }}
                      className="mt-2 rounded-md  border-2 border-brand-500 px-4 py-2"
                    >
                      Add
                    </button>
                  </div>
                  <div className="relative mt-8 w-full">
                    <h1>Set Agent rate</h1>
                    <input
                      type="number"
                      onChange={(e) => {
                        setInprate(e.target.value);
                      }}
                      value={inpRate}
                      placeholder="Enter The Ammount"
                      className="rounded-md p-2 shadow-sm"
                    />
                    <br />
                    <button
                      onClick={setRate}
                      className="mt-2 rounded-md  border-2 border-brand-500 px-4 py-2"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <div className="relative w-full space-y-2">
                    <h1>
                      Agent is currently
                      <span className="font-bold">
                        {data.status === 403 ? " Blocked" : " Active"}
                      </span>
                    </h1>
                    {data.status === 403 ? (
                      <button
                        onClick={unblockAgent}
                        className="rounded bg-green-500 px-4 py-2 text-left font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 "
                      >
                        Unlock Agent
                      </button>
                    ) : (
                      <button
                        onClick={blockAgent}
                        className="rounded bg-red-500 px-4 py-2 text-left font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 "
                      >
                        Block Agent
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default DetailAgentmodule;

export function PhUserBold(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M234.38 210a123.36 123.36 0 0 0-60.78-53.23a76 76 0 1 0-91.2 0A123.36 123.36 0 0 0 21.62 210a12 12 0 1 0 20.77 12c18.12-31.32 50.12-50 85.61-50s67.49 18.69 85.61 50a12 12 0 0 0 20.77-12ZM76 96a52 52 0 1 1 52 52a52.06 52.06 0 0 1-52-52Z"
      ></path>
    </svg>
  );
}

export function PhThumbsUp(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M234 80.12A24 24 0 0 0 216 72h-56V56a40 40 0 0 0-40-40a8 8 0 0 0-7.16 4.42L75.06 96H32a16 16 0 0 0-16 16v88a16 16 0 0 0 16 16h172a24 24 0 0 0 23.82-21l12-96A24 24 0 0 0 234 80.12ZM32 112h40v88H32Zm191.94-15l-12 96a8 8 0 0 1-7.94 7H88v-94.11l36.71-73.43A24 24 0 0 1 144 56v24a8 8 0 0 0 8 8h64a8 8 0 0 1 7.94 9Z"
      ></path>
    </svg>
  );
}

export function PhMoneyBold(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M240 52H16A12 12 0 0 0 4 64v128a12 12 0 0 0 12 12h224a12 12 0 0 0 12-12V64a12 12 0 0 0-12-12Zm-58.79 128H74.79A60.18 60.18 0 0 0 28 133.21v-10.42A60.18 60.18 0 0 0 74.79 76h106.42A60.18 60.18 0 0 0 228 122.79v10.42A60.18 60.18 0 0 0 181.21 180ZM228 97.94A36.23 36.23 0 0 1 206.06 76H228ZM49.94 76A36.23 36.23 0 0 1 28 97.94V76ZM28 158.06A36.23 36.23 0 0 1 49.94 180H28ZM206.06 180A36.23 36.23 0 0 1 228 158.06V180ZM128 88a40 40 0 1 0 40 40a40 40 0 0 0-40-40Zm0 56a16 16 0 1 1 16-16a16 16 0 0 1-16 16Z"
      ></path>
    </svg>
  );
}

export function BytesizeSettings(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M13 2v4l-2 1l-3-3l-4 4l3 3l-1 2H2v6h4l1 2l-3 3l4 4l3-3l2 1v4h6v-4l2-1l3 3l4-4l-3-3l1-2h4v-6h-4l-1-2l3-3l-4-4l-3 3l-2-1V2Z"></path>
        <circle cx="16" cy="16" r="4"></circle>
      </g>
    </svg>
  );
}
