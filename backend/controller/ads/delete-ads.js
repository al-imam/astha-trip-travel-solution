const Ads = require("../../model/Ads");

module.exports = async function (req, res, next) {
  try {
    await Ads.deleteAll({ url: req.body.url });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
