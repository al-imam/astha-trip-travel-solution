import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "layouts/admin";
import Agent from "layouts/agent/Agent";
import AuthLayout from "layouts/auth";
import AgentEntry from "views/agent/agentEntry/AgentEntry";
import AgentLogin from "views/agent/agentLogin/AgentLogin";
import AgentProfile from "views/agent/agentProfile/AgentProfile";
import AgentHome from "views/agent/home/AgentHome";
import MainEntry from "views/public/Entry/MainEntry";
import { Schengen } from "views/public/Entry/Schengen";
import { Singapore } from "views/public/Entry/Singapore";
import { Thailand } from "views/public/Entry/Thailand";
import Registration from "./views/agent/Rgistration/Registration";
import VisaFrom from "./views/agent/VisaApplication/Index"; 

function App() {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="entry">
        <Route index element={<MainEntry />} />
        <Route path="schengen" element={<Schengen />} />
        <Route path="singapore" element={<Singapore />} />
        <Route path="thailand" element={<Thailand />} />

        <Route path="*" element={<Navigate to="/entry" replace />} />
      </Route>
      <Route path="agentEntry/*" element={<AgentEntry />} />

      <Route path="/agent/Login" element={<AgentLogin />} />
      <Route path="/agent/registration" element={<Registration />} />
      <Route path="/agent" element={<Agent />}>
        <Route index element={<AgentHome />} />
        <Route path="/agent/agentProfile" element={<AgentProfile />} />
        <Route path="/agent/visa-application" element={<VisaFrom />} />
      </Route>
      <Route path="/" element={<Navigate to="/agent" replace />} />
    </Routes>
  );
}

export default App;
