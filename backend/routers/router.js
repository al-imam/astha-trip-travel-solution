const express = require("express");
const MainRouter = express.Router();
const TempRouter = require("./temp");
const AuthRoute = require("./auth");
const LOIRoute = require("./LOI");
const AgentRoute = require("./agent");
const AdminRouter = require("./admin");
const Logout = require("../controller/agent/logout");

MainRouter.use("/api/agent", AgentRoute);
MainRouter.use("/api/auth", AuthRoute);
MainRouter.use("/temp", TempRouter);
MainRouter.use("/api/loi", LOIRoute);
MainRouter.use("/api/admin", AdminRouter);
MainRouter.get("/api/logout", Logout);

module.exports = MainRouter;
