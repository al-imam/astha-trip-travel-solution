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
const LOI = require("../model/LOI");
const LoiByAgent =require('../controller/LOI/LoiByAgent')
LOIRoute.post("/entry", isAuthenticate, LOIEntry);
LOIRoute.get("/getall", isAdmin, GetAll);

LOIRoute.post(
  "/approved-python",
  isAdmin,
  validateBody([isNumber("id", true)]),
  approveLoiRequest
);

LOIRoute.post(
  "/resend-email-python",
  isAdmin,
  validateBody([isNumber("id", true)]),
  async (req, res, next) => {
    const [loiData] = await LOI.findById(req.body.id);
    if (loiData && loiData.status === "approved") return next();
    return res.status(400).json({
      message: "Loi not approved yet!",
      code: "resend-validate-failed",
    });
  },
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
LOIRoute.post("/loibyagent",isAdmin,LoiByAgent);

module.exports = LOIRoute;
