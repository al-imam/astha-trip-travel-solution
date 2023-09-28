const Ads = require("../../model/Ads");

module.exports = async function (_, res, next) {
  try {
    const [allAds] = await Ads.findAll();
    res.json(allAds);
  } catch (error) {
    next(error);
  }
};
