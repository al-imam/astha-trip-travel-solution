import axios from "axios";
import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { Select } from "components/form/Select";
import Widget from "components/widget/Widget";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

function getNumber(str, fallback = 0) {
  const num = parseFloat(str);
  if (isNaN(num)) return fallback;
  return num;
}

const Addpayment = ({ close }) => {
  const [allAgent, SetAllAgent] = useState([]);
  const [loading, setLoading] = useState(true);

  const [SelectedAgent, setSelectedAgent] = useState(null);
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const Getdata = async () => {
      try {
        const serverRes = await axios.get("/api/admin/get-all-agent");
        SetAllAgent(
          serverRes.data?.map((e) => {
            return {
              label: e.email,
              value: e.email,
            };
          })
        );
        setLoading(false);
      } catch (error) {
        console.log("🚀 ~ file: Addpayment.jsx:17 ~ Getdata ~ error:", error);
        toast.error("something is wrong !");
      }
    };
    Getdata();
  }, []);

  // select an agent then
  const [FetchAllLOI, SetFetchAllLOI] = useState([]);
  useEffect(() => {
    if (SelectedAgent) {
      const getAgentData = async () => {
        try {
          const serverRes = await toast.promise(
            axios.post("/api/loi/loibyagent", {
              email: SelectedAgent.value,
            }),
            {
              pending: "please Wait ..",
              error: "OPS Something is wrong!",
              success: "Data fetched Successfully",
            },
            {
              position: "top-center",
            }
          );
          SetFetchAllLOI(serverRes.data);
        } catch (error) {
          console.log("🚀 ~ file: Addpayment.jsx:47 ~ getAgentData ~ error:", error);
        }
      };
      getAgentData();
    }
  }, [SelectedAgent]);

  async function onSubmit(evt) {
    evt.preventDefault();

    const numRate = getNumber(rate);
    const numAmount = getNumber(amount);

    if (!(numRate > 0 && numAmount > 0)) return toast.error("Type rate and amount");

    const serverRes = await axios
      .post("/api/payment/create", { rate: numRate, amount: numAmount, agent: SelectedAgent.value })
      .catch(console.log);
  }

  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-full overflow-y-scroll bg-brand-100/20 backdrop-blur-sm">
      <div className="relative w-full px-5 pt-3">
        <div className="relative w-full rounded-t-md bg-brand-400 p-2 shadow-md"></div>
        <div className="relative w-full rounded-b-md border-x-2 border-b-2 border-brand-400 bg-white/80 px-4 pt-3 pb-6 backdrop-blur-2xl">
          <div className="relative w-full">
            <h1 className="flex items-center justify-center border-b-2 border-brand-100 pb-2 text-xl font-bold">
              <span className="text-3xl">
                <FluentMoneyHand24Filled />
              </span>
              Add Payment History
            </h1>
          </div>

          <div className="relative grid w-full grid-cols-2 gap-2">
            <div className="relative col-span-2 w-full py-3 md:col-span-1">
              <label className="flex items-center py-2 ">
                Choose Agent:
                {loading ? (
                  <span className="relative pl-2 text-brand-600">
                    <EosIconsBubbleLoading />
                  </span>
                ) : (
                  ""
                )}
              </label>
              <CreatableSelect
                isDisabled={loading}
                placeholder="Select agent"
                onChange={(change) => setSelectedAgent(change)}
                value={SelectedAgent}
                options={allAgent}
                styles={{
                  control: (styles, state) => ({
                    ...styles,
                    margin: 0,
                    padding: 2,
                    backgroundColor: "rgb(248 249 250)",
                    borderColor: state.isFocused
                      ? "rgb(59 130 246 / 0.5)"
                      : state.isDisabled
                      ? "rgb(233 227 255)"
                      : "rgb(192 184 254)",
                    opacity: state.isDisabled ? "0.5" : 1,
                    borderWidth: 1.5,
                    "&:hover": {
                      borderColor: "none",
                    },
                    boxShadow: state.isFocused ? "0 0 0 1px rgb(59 130 246 / 0.5)" : "none",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    fontSize: "0.875rem",
                    color: "#adb5bd",
                    userSelect: "none",
                  }),
                  valueContainer: (styles) => ({
                    ...styles,
                    userSelect: "none",
                    color: "rgb(27 37 89)",
                    letterSpacing: "0.3px",
                  }),
                }}
              />
            </div>
          </div>
          {FetchAllLOI.length ? (
            <div>
              <div className="relative flex w-full flex-wrap justify-between gap-3 py-3 xl:flex-nowrap">
                <Widget
                  icon={<MaterialSymbolsDonutSmallOutline className="text-2xl" />}
                  title={"Total Submission"}
                  subtitle={FetchAllLOI.length}
                />
                <Widget
                  icon={<MaterialSymbolsPaidOutline className="text-2xl" />}
                  title={"Already Paid"}
                  subtitle={300}
                />
                <Widget
                  icon={<MaterialSymbolsPaidOutline className="text-2xl" />}
                  title={"Due Payment"}
                  subtitle={300}
                />
                <Widget
                  icon={<MaterialSymbolsPaidOutline className="text-2xl" />}
                  title={"Total cancel"}
                  subtitle={300}
                />
                <Widget
                  icon={<MaterialSymbolsPaidOutline className="text-2xl" />}
                  title={"Due Payment"}
                  subtitle={300}
                />
              </div>

              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row [&>*]:flex-1">
                  <Input
                    value={amount}
                    onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                    label="Enter The Amount Of application"
                    type={"number"}
                  />
                  <Input
                    value={rate}
                    onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                    onChange={(e) => setRate(e.target.value.replace(/[^0-9]/g, ""))}
                    label="Enter The Rate"
                    type={"number"}
                  />
                </div>

                <p className="text-xl">
                  <span className="font-medium">Total</span> - {getNumber(rate) * getNumber(amount)}
                </p>

                <div className="flex justify-between">
                  <Button className="mt-auto">Add payment</Button>
                  <button
                    type="button"
                    onClick={() => {
                      close(false);
                    }}
                    className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:bg-red-400"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="relative w-full">
                <div className="flex h-72 w-full flex-col items-center justify-center">
                  <div className="text-5xl text-brand-500">
                    <LineMdBeerLoop />
                  </div>
                  <p className="pt-3 text-xl font-extralight tracking-wide">
                    No Data Available Please Select Agent Or Another Agent
                  </p>
                </div>
              </div>
              <div className="py-3">
                <button
                  onClick={() => {
                    close(false);
                  }}
                  className="rounded-md bg-red-500 px-5 py-2 text-white "
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addpayment;

export function FluentMoneyHand24Filled(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M6.25 2A2.25 2.25 0 0 0 4 4.25v15.5A2.25 2.25 0 0 0 6.25 22h7.5A2.25 2.25 0 0 0 16 19.771v-1.52a.75.75 0 0 0-.75-.75c-.453 0-.739-.123-.936-.282c-.208-.167-.38-.425-.511-.789c-.273-.755-.302-1.75-.302-2.68a.75.75 0 0 0-.202-.512l-.165-.177a2.449 2.449 0 0 0-.17-.173c-.074-.07-.3-.285-1.183-1.168c-.469-.469-.728-.865-.813-1.168a.616.616 0 0 1-.016-.325a.713.713 0 0 1 .205-.323a.71.71 0 0 1 .322-.204a.612.612 0 0 1 .324.016c.302.085.698.346 1.167.815c.54.54 1.053 1.046 1.512 1.5c.76.752 1.373 1.36 1.72 1.73a.75.75 0 0 0 1.097-1.023A55.424 55.424 0 0 0 16 11.424V8.06l2.841 2.842c.422.422.66.994.66 1.59v8.758a.75.75 0 0 0 1.5 0v-8.757a3.75 3.75 0 0 0-1.099-2.652L16 5.939v-1.69A2.25 2.25 0 0 0 13.75 2h-7.5Zm7.124 16.388a2.71 2.71 0 0 0 1.126.534V19h-.75a.75.75 0 0 0-.75.75v.75h-1.5v-.75a2.25 2.25 0 0 1 1.276-2.028c.16.244.356.472.598.666Zm-1.372-4.342c.002.253.007.526.022.81a3.5 3.5 0 1 1-1.55-6.324c-.133.089-.26.193-.378.312c-.292.292-.5.63-.597 1.01c-.097.38-.074.754.025 1.104c.189.673.665 1.291 1.197 1.823A66.717 66.717 0 0 0 11.957 14l.004.003l.037.039l.004.004ZM7 3.5h1.5v.75A2.25 2.25 0 0 1 6.25 6.5H5.5V5h.75A.75.75 0 0 0 7 4.25V3.5Zm4.5 0H13v.75c0 .414.336.75.75.75h.75v1.5h-.75a2.25 2.25 0 0 1-2.25-2.25V3.5Zm-3 17H7v-.75a.75.75 0 0 0-.75-.75H5.5v-1.5h.75a2.25 2.25 0 0 1 2.25 2.25v.75Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsDonutSmallOutline(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M13.025 2.05q3.575.35 6.088 2.863T21.974 11h-7.15q-.225-.65-.687-1.137t-1.113-.713v-7.1Zm2 2.55V8q.275.225.525.475t.475.525h3.4q-.6-1.5-1.75-2.65t-2.65-1.75Zm-4-2.55v7.1q-.9.325-1.45 1.113T9.025 12q0 .95.55 1.713t1.45 1.087v7.15q-3.85-.375-6.425-3.225T2.025 12q0-3.875 2.575-6.725t6.425-3.225Zm-2 2.55q-2.275.875-3.638 2.9T4.026 12q0 2.475 1.363 4.5t3.637 2.95V16q-.95-.725-1.475-1.763T7.025 12q0-1.2.525-2.238T9.025 8V4.6Zm5.8 8.4h7.15q-.35 3.575-2.863 6.088t-6.087 2.862V14.8q.65-.225 1.113-.688T14.825 13Zm1.2 2q-.2.275-.462.525t-.538.475v3.4q1.5-.6 2.65-1.75t1.75-2.65h-3.4Zm-9-2.975Zm9-3.025Zm0 6Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsPaidOutline(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.1 19h1.75v-1.25q1.25-.225 2.15-.975t.9-2.225q0-1.05-.6-1.925T12.9 11.1q-1.5-.5-2.075-.875T10.25 9.2q0-.65.463-1.025T12.05 7.8q.8 0 1.25.387t.65.963l1.6-.65q-.275-.875-1.012-1.525T12.9 6.25V5h-1.75v1.25q-1.25.275-1.95 1.1T8.5 9.2q0 1.175.688 1.9t2.162 1.25q1.575.575 2.188 1.025t.612 1.175q0 .825-.588 1.213t-1.412.387q-.825 0-1.463-.512T9.75 14.1l-1.65.65q.35 1.2 1.088 1.938T11.1 17.7V19Zm.9 3q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
      ></path>
    </svg>
  );
}

export function EosIconsBubbleLoading(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="2" r="0" fill="currentColor">
        <animate
          attributeName="r"
          begin="0"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)">
        <animate
          attributeName="r"
          begin="0.125s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)">
        <animate
          attributeName="r"
          begin="0.25s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)">
        <animate
          attributeName="r"
          begin="0.375s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)">
        <animate
          attributeName="r"
          begin="0.5s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)">
        <animate
          attributeName="r"
          begin="0.625s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)">
        <animate
          attributeName="r"
          begin="0.75s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)">
        <animate
          attributeName="r"
          begin="0.875s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
    </svg>
  );
}

export function LineMdBeerLoop(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <mask id="lineMdBeerLoop0">
        <path
          stroke="#fff"
          strokeWidth="2"
          d="M18 7C16 7 15 9 13 9C11 9 10 7 8 7C6 7 5 9 3 9C1 9 0 7 -2 7C-4 7 -5 9 -7 9"
          opacity="0"
        >
          <animateMotion calcMode="linear" dur="3s" path="M0 0h10" repeatCount="indefinite"></animateMotion>
          <animate fill="freeze" attributeName="opacity" begin="0.6s" dur="0.5s" values="0;1"></animate>
        </path>
      </mask>
      <path
        fill="none"
        stroke="currentColor"
        strokeDasharray="60"
        strokeDashoffset="60"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 3L16 21H7L5 3z"
      >
        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="60;0"></animate>
      </path>
      <path fill="currentColor" d="M18 3L16 21H7L5 3z" mask="url(#lineMdBeerLoop0)"></path>
    </svg>
  );
}
