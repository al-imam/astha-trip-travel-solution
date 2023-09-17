const express = require("express");
const VisaFormRouter = express.Router();
const isAuthenticate = require("../middleware/Auth/isAuthenticate");
const isAdmin = require("../middleware/Auth/isAdmin");
// controller 

const VisaFormColector = require('../controller/VisaForm/VisaFormCollector');
const GetByPassport = require("../controller/VisaForm/GetByPassport")
const GetForm = require("../controller/VisaForm/GetForm");


VisaFormRouter.post('/schengen', isAuthenticate, VisaFormColector().schengen);

// get data by passport 
VisaFormRouter.post('/get-by-passport', isAdmin, GetByPassport);

VisaFormRouter.get("/get-singapore", isAdmin, GetForm().Singapore);
VisaFormRouter.get("/get-thailand", isAdmin, GetForm().Thailand);
VisaFormRouter.get("/get-schengen", isAdmin, GetForm().Schengen);


module.exports = VisaFormRouter;