const Ads = require("../../model/Ads");
const path = require("path");
const fs = require("fs");

module.exports = async function (req, res, next) {
  try {
    await Ads.deleteAll({ url: req.body.url });
    const local = path.join(__dirname, "../../upload/ads", req.body.url);
    if (fs.existsSync(local)) fs.unlinkSync(local);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
