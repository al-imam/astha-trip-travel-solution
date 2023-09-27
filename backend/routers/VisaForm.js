const express = require("express");
const VisaFormRouter = express.Router();
const isAuthenticate = require("../middleware/Auth/isAuthenticate");
const isAdmin = require("../middleware/Auth/isAdmin");
const isAgent = require("../middleware/Auth/isAgent");
// controller

const VisaFormColector = require("../controller/VisaForm/VisaFormCollector");
const GetByPassport = require("../controller/VisaForm/GetByPassport");
const GetForm = require("../controller/VisaForm/GetForm");
const Approved = require("../controller/VisaForm/Approved");
const passportNumbers = require("../controller/VisaForm/passport-numbers");
const GeneratePDF = require("../controller/VisaForm/GenaratePDF");
const Approval = require("../middleware/visa-form/Approval");

VisaFormRouter.post(
  "/schengen",
  isAuthenticate,
  Approval,
  VisaFormColector().schengen
);
VisaFormRouter.post(
  "/singapore",
  isAuthenticate,
  Approval,
  VisaFormColector().singapore
);
VisaFormRouter.post(
  "/thailand",
  isAuthenticate,
  Approval,
  VisaFormColector().thailand
);

// get data by passport
VisaFormRouter.post("/get-by-passport", isAdmin, GetByPassport);

VisaFormRouter.get("/get-singapore", isAdmin, GetForm().Singapore);
VisaFormRouter.get("/get-thailand", isAdmin, GetForm().Thailand);
VisaFormRouter.get("/get-schengen", isAdmin, GetForm().Schengen);
VisaFormRouter.get("/get-by-agent", isAgent, GetForm().agent);

// action controller
VisaFormRouter.post("/approved", isAdmin, Approved);

VisaFormRouter.get(
  "/get-by-passport/:passport",
  isAuthenticate,
  GetForm().get_by_passport
);
VisaFormRouter.get(
  "/download-form-pdf-schengen/:id",
  isAuthenticate,
  GeneratePDF().schengen
);
VisaFormRouter.get(
  "/download-form-pdf-singapore/:id",
  isAuthenticate,
  GeneratePDF().singapore
);

VisaFormRouter.get(
  "/download-form-pdf-thailand/:id",
  isAuthenticate,
  GeneratePDF().thailand
);

VisaFormRouter.get("/passport-numbers", isAuthenticate, passportNumbers);

module.exports = VisaFormRouter;
