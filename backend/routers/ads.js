const addAdsPhoto = require("../controller/ads/add-ads-photo");
const getMulter = require("../util/multer");
const path = require("path");

const router = require("express").Router();

router.post(
  "/add-ads-photo",
  getMulter({
    destination: path.join(__dirname, "../upload/ads"),
    regex: /jpg|png|jpeg/,
    images: "jpg, png, jpeg",
  }).single("photo"),
  addAdsPhoto
);

module.exports = router;
