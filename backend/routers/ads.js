const addAdsPhoto = require("../controller/ads/add-ads-photo");
const allAds = require("../controller/ads/ads");
const sendAdsImage = require("../controller/ads/sendAdsImage");
const getMulter = require("../util/multer");
const path = require("path");

const router = require("express").Router();

router.get("/", allAds);

router.post(
  "/add-ads-photo",
  getMulter({
    destination: path.join(__dirname, "../upload/ads"),
    regex: /jpg|png|jpeg/,
    images: "jpg, png, jpeg",
  }).single("photo"),
  addAdsPhoto
);

router.get("/get/:name", sendAdsImage);

module.exports = router;
