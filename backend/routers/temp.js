const express = require("express");
const TempRouter = express.Router();
const PhotoUploader = require("../controller/Temp/photoupload");
const UploadTempPhoto = require("../util/PhotoUploader");
const isAuthenticate = require("../middleware/Auth/isAuthenticate");

TempRouter.post(
  "/guestlist/photoupload",
  isAuthenticate,
  UploadTempPhoto.fields([
    { name: "imgpasport", maxCount: 1 },
    { name: "imgvisa", maxCount: 1 },
    { name: "hotel", maxCount: 1 },
    { name: "ticket", maxCount: 1 },
  ]),
  PhotoUploader
);

module.exports = TempRouter;
