import axios from "axios";
import REqu from "components/LOIreqTable/REqu";
import Widget from "components/widget/Widget";
import { useEffect, useRef, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import NotificationSound from "./notification.mp3";
// import socket connection
import { toast } from "react-toastify";
import { socket } from "../../../socket";
const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [reload, setReload] = useState(0);

  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState({});

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearch = () => {
    setSearch(input);
  };

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const audioPlayer = useRef(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("connected");
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("getNewLOI", () => {
      toast.info("New request is coming");
      audioPlayer.current.play();
      setReload((e) => e + 1);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("getNewLOI", () => {
        setReload((e) => e + 1);
      });
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/admin/get-status");
        setStatus(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [reload]);

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <audio ref={audioPlayer} src={NotificationSound} />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Submitted Today"}
          subtitle={status.submitToday ?? 0}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Approved Today"}
          subtitle={status.confirmToday ?? 0}
        />
        <Widget icon={<MdBarChart className="h-7 w-7" />} title={"Total Pending"} subtitle={status.totalTask ?? 0} />
        <Widget icon={<MdDashboard className="h-6 w-6" />} title={"Total Cancel"} subtitle={status.totalCancel ?? 0} />
        <Widget icon={<MdBarChart className="h-7 w-7" />} title={"Total Submit"} subtitle={status.totalSubmit ?? 0} />
        <Widget icon={<IoMdHome className="h-6 w-6" />} title={"Total Approved"} subtitle={status.totalApproved ?? 0} />
      </div>

      <div className="grid w-full grid-cols-1 items-center justify-start gap-3 py-5 md:grid-cols-3">
        <Link
          to="/entry"
          className="inline-block rounded-lg border-2 border-brand-900/30 bg-white/10  p-3 text-xl font-bold text-brand-600 shadow-xl hover:scale-105 dark:border-brand-200 dark:text-brand-100"
        >
          <span className="flex">
            <MaterialSymbolsAddNotesOutline />
            Add New Entry
          </span>
        </Link>
        <div className="flex items-center space-x-2">
          <label htmlFor="status" className="text-gray-600">
            Select Status:
          </label>
          <select
            id="status"
            className="rounded-lg border px-4 py-2 outline-none focus:border-blue-300 focus:ring focus:ring-blue-300"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="">All Data</option>
            <option selected value="approved">
              Approved
            </option>
            <option value="pending">Pending</option>
            <option value="cancel">Cancel</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg border px-8 py-2 outline-none focus:border-blue-300 focus:ring focus:ring-blue-300"
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <HeroiconsSolidSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      <div className="relative w-full p-3">
        <REqu
          selectedOption={selectedOption}
          search={search}
          relaod={[reload, setReload]}
          setSelect={setSelectedOption}
        />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2"></div>
    </div>
  );
};

export default Dashboard;

export function MaterialSymbolsAddNotesOutline(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v6.7q-.475-.225-.975-.388T19 11.075V5H5v14h6.05q.075.55.238 1.05t.387.95H5Zm0-3v1V5v6.075V11v7Zm2-1h4.075q.075-.525.238-1.025t.362-.975H7v2Zm0-4h6.1q.8-.75 1.788-1.25T17 11.075V11H7v2Zm0-4h10V7H7v2Zm11 14q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23Zm-.5-2h1v-2.5H21v-1h-2.5V15h-1v2.5H15v1h2.5V21Z"
      ></path>
    </svg>
  );
}

export function HeroiconsSolidSearch(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
