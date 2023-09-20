const express = require("express");
const VisaFormRouter = express.Router();
const isAuthenticate = require("../middleware/Auth/isAuthenticate");
const isAdmin = require("../middleware/Auth/isAdmin");
// controller 

const VisaFormColector = require('../controller/VisaForm/VisaFormCollector');
const GetByPassport = require("../controller/VisaForm/GetByPassport")
const GetForm = require("../controller/VisaForm/GetForm");
const Approved = require('../controller/VisaForm/Approved');


VisaFormRouter.post('/schengen', isAuthenticate, VisaFormColector().schengen);
VisaFormRouter.post('/singapore', isAuthenticate, VisaFormColector().singapore);
VisaFormRouter.post('/thailand', isAuthenticate, VisaFormColector().thailand);

// get data by passport 
VisaFormRouter.post('/get-by-passport', isAdmin, GetByPassport);

VisaFormRouter.get("/get-singapore", isAdmin, GetForm().Singapore);
VisaFormRouter.get("/get-thailand", isAdmin, GetForm().Thailand);
VisaFormRouter.get("/get-schengen", isAdmin, GetForm().Schengen);

// action controller
VisaFormRouter.post("/approved",isAdmin,Approved)


module.exports = VisaFormRouter;