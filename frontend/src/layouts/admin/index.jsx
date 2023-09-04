import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import Footer from "components/footer/Footer";
import axios from "axios";
import routes from "routes.js";

import { useNavigate } from "react-router-dom";

export default function Admin(props) {
  const navigate = useNavigate();
  const [admin, setadmin] = useState(null);
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    const getdata = async () => {
      try {
        const getAdmin = await axios("/api/auth/info");
        if (!getAdmin.data) {
          return navigate("/auth/sign-in");
        }
        setadmin(getAdmin.data);
      } catch (error) {
        console.log("🚀 ~ file: index.jsx:20 ~ getdata ~ error:", error);
        navigate("/auth/sign-in");
      }
    };
    getdata();
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].layout + "/" + routes[i].path) !== -1) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return <Route path={`/${prop.path}`} element={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return admin ? (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}>
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Dewan Travel"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route path="/" element={<Navigate to="/admin/default" replace />} />
              </Routes>
            </div>
            <div className="p-3">{/* <Footer /> */}</div>
          </div>
        </main>
      </div>
    </div>
  ) : (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
    </div>
  );
}
