const express = require("express");
const VisaFormRouter = express.Router();
const isAuthenticate = require("../middleware/Auth/isAuthenticate");

// controller 

const VisaFormColector = require('../controller/VisaForm/VisaFormCollector');

VisaFormRouter.post('/schengen', isAuthenticate, VisaFormColector().schengen);

module.exports = VisaFormRouter;