import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [agent, setAgent] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: _admin } = await axios.get("/api/auth/info").catch(() => {
        return { data: null };
      });
      setAdmin(_admin);

      const { data: _agent } = await axios.get("/api/agent/info").catch(() => {
        return { data: null };
      });
      setAgent(_agent);

      setLoading(false);

      if (_admin === null && _agent === null) navigate("/agent/login");
    })();
  }, []);

  return { admin, agent, isLoading: loading };
}
