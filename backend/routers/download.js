const express = require("express");
const downloadRoute = express.Router();
const isAgent = require("../middleware/Auth/isAgent");
const isAdmin = require("../middleware/Auth/isAdmin");
const DownloadLoiByAgent = require("../controller/LOI/DownloadLoiByAgent");

downloadRoute.get("/loi/:id", isAgent, DownloadLoiByAgent().loi);
downloadRoute.get("/itinerary/:ref", isAgent, DownloadLoiByAgent().itinerary);
downloadRoute.get("/admin/loi/:id", isAdmin, DownloadLoiByAgent().adminLoiFile);

module.exports = downloadRoute;
