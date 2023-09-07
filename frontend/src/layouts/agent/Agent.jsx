import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AgentNavbar from "views/agent/navbar/AgentNavbar";

function Agent() {
  const [agent, setAgent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getAuth = async () => {
      try {
        const { data: agent } = await axios.get("/api/agent/info");
        setAgent(agent);
      } catch (e) {
        console.log(e);
        navigate("/agent/Login");
      }
    };

    getAuth();
  }, []);

  return agent ? (
    <div className="bg-[#F5F8FE] p-5 md:p-1">
      <AgentNavbar agent={agent} />
      <div className="container mx-auto my-5">
        <Outlet />
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Agent;
