const addAdsPhoto = require("../controller/ads/add-ads-photo");
const allAds = require("../controller/ads/ads");
const deleteAds = require("../controller/ads/delete-ads");
const sendAdsImage = require("../controller/ads/sendAdsImage");
const isAdmin = require("../middleware/Auth/isAdmin");

const getMulter = require("../util/multer");
const path = require("path");

const router = require("express").Router();

router.get("/", isAdmin, allAds);

router.post(
  "/add-ads-photo",
  isAdmin,
  getMulter({
    destination: path.join(__dirname, "../upload/ads"),
    regex: /jpg|png|jpeg/,
    images: "jpg, png, jpeg",
  }).single("photo"),
  addAdsPhoto
);

router.post("/remove-ads", isAdmin, deleteAds);

router.get("/get/:name", sendAdsImage);

module.exports = router;
