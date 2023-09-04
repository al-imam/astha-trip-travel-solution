import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "./table";

const Index = () => {
  const [reqList, setReqList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [relod, setRelod] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/admin/get-balance-requests");
        setReqList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [relod]);

  const handelRejection = async (id) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const resdb = await toast.promise(
        axios.post("/api/admin/reject", {
          id,
        }),
        {
          pending: "please wait..",
          success: "Request rejected successfully",
          error: "Something went wrong",
        }
      );
      setRelod((o) => o + 1);
    } catch (error) {
      console.log("🚀 ~ file: Index.jsx:24 ~ handelRejection ~ error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handelapp = async (id) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const resdb = await toast.promise(
        axios.post("/api/admin/accept", {
          id,
        }),
        {
          pending: "please wait..",
          success: "Request accepted successfully",
          error: "Something went wrong",
        }
      );
      setRelod((o) => o + 1);
    } catch (error) {
      console.log("🚀 ~ file: Index.jsx:24 ~ handelRejection ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full pt-5">
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
              // console.log(props);
              return (
                <div>
                  <p className="font-bold text-brand-900">
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
                          handelapp(`${props.row.original.id}`);
                        }}
                        className="border-transparent rounded border bg-brand-900 py-2 px-4 font-bold text-white hover:bg-brand-800"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handelRejection(`${props.row.original.id}`);
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
