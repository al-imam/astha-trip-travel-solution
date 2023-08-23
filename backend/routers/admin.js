const AdminRouter = require("express").Router();
const { isString, isNumber } = require("nested-object-validate");
const getAllAgent = require("../controller/agent/getAllAgent");
const addBalance = require("../controller/account/balance");
const setrate = require("../controller/account/setrate");
const getStatus = require("../controller/account/status");
const isAdmin = require("../middleware/Auth/isAdmin");
const validateBody = require("../middleware/validator/validateBody");
const getBalanceRequests = require("../controller/account/getBalanceRequests");
const accept = require("../controller/account/accept");
const reject = require("../controller/account/reject");
const changePassword = require("../controller/account/changePassword");
const storage = require("../controller/os/storage");
const clearCache = require("../controller/os/clearCache");
const blockAgent = require("../controller/account/blockAgent");
const unblockAgent = require("../controller/account/unblockAgent");

AdminRouter.get("/get-all-agent", isAdmin, getAllAgent);
AdminRouter.get("/get-status", isAdmin, getStatus);
AdminRouter.post(
  "/add-balance",
  isAdmin,
  validateBody([isString("id"), isString("balance")]),
  addBalance
);
AdminRouter.post(
  "/setrate",
  isAdmin,
  validateBody([isString("id"), isString("rate")]),
  setrate
);

AdminRouter.get("/get-balance-requests", isAdmin, getBalanceRequests);
AdminRouter.post("/accept", validateBody([isString("id")]), isAdmin, accept);
AdminRouter.post("/reject", validateBody([isString("id")]), reject);

AdminRouter.post("/change-password", isAdmin, changePassword);

AdminRouter.get("/storage-info", isAdmin, storage);
AdminRouter.post("/clear-cache", isAdmin, clearCache);

AdminRouter.post(
  "/block-agent",
  validateBody([isNumber("id", true)]),
  isAdmin,
  blockAgent
);

AdminRouter.post(
  "/unblock-agent",
  validateBody([isNumber("id", true)]),
  isAdmin,
  unblockAgent
);

module.exports = AdminRouter;
