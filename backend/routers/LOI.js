const express = require("express");
const LOIRoute = express.Router();
const LOIEntry = require("../controller/LOI/LOIentry");
const GetAll = require("../controller/LOI/getall");
const CancelController = require("../controller/LOI/Cancel");
const validateBody = require("../middleware/validator/validateBody");
const { isString, isNumber } = require("nested-object-validate");
const isAdmin = require("../middleware/Auth/isAdmin");
const isAuthenticate = require("../middleware/Auth/isAuthenticate");
const approveLoiRequest = require("../controller/LOI/approveLoiRequest");
const deleteController = require("../controller/LOI/deleteAfterCancel");

LOIRoute.post("/entry", isAuthenticate, LOIEntry);
LOIRoute.get("/getall", isAdmin, GetAll);

LOIRoute.post(
  "/approved-python",
  isAdmin,
  validateBody([isNumber("id", true)]),
  approveLoiRequest
);

LOIRoute.post(
  "/cancel",
  isAdmin,
  validateBody([isString("reference")]),
  CancelController
);

LOIRoute.post(
  "/delete-after-cancel",
  isAdmin,
  validateBody([isString("reference")]),
  deleteController
);

module.exports = LOIRoute;
