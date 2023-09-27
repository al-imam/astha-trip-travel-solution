const Ads = require("../../model/Ads");

module.exports = async function (req, res, next) {
  try {
    await Ads.Add({ admin: req.body.id, url: req.file.filename });
    res.json({ success: true, filename: req.file.filename });
  } catch (error) {
    next(error);
  }
};
