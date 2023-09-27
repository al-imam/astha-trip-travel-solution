const express = require("express");
const registration = require("../controller/agent/registration");
const approve = require("../controller/agent/approve");
const validateBody = require("../middleware/validator/validateBody");
const { isString, isNumber } = require("nested-object-validate");
const Login = require("../controller/agent/login");
const balanceInvoice = require("../controller/agent/balanceInvoice");
const isAdmin = require("../middleware/Auth/isAdmin");
const getInfo = require("../controller/agent/info");
const isAgent = require("../middleware/Auth/isAgent");
const addBalance = require("../controller/agent/addBalance");
const changePassword = require("../controller/agent/changePassword");
const getLOIById = require("../controller/agent/getLOIById");
const getMulter = require("../util/multer");
const uploadProfilePhoto = require("../controller/Agent/uploadProfilePhoto");
const path = require("path");

const AgentRoute = express.Router();

AgentRoute.post(
  "/reg",
  validateBody([
    isString("name"),
    isString("nid_no"),
    isString("email"),
    isString("phone"),
  ]),
  registration
);

AgentRoute.post(
  "/login",
  validateBody([isString("password"), isString("email")]),
  Login
);

AgentRoute.post(
  "/change-password",
  isAgent,
  validateBody([isString("password"), isString("current-password")]),
  changePassword
);

AgentRoute.post(
  "/add-balance",
  validateBody([
    isString("transition_id"),
    isNumber("agent_id"),
    isNumber("amount"),
  ]),
  addBalance
);

AgentRoute.post("/approve", isAdmin, validateBody(["id"]), approve);

AgentRoute.get("/info", getInfo);

AgentRoute.get("/agent-loi-by-id", isAgent, getLOIById);

AgentRoute.get("/balance-invoice/:agent_id", isAgent, balanceInvoice);

AgentRoute.post(
  "/upload-profile-photo",
  getMulter({
    destination: path.normalize(path.join(__dirname, "..", "upload", "avatar")),
  }).single("photo"),
  uploadProfilePhoto
);

module.exports = AgentRoute;
