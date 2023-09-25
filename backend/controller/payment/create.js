const Payment = require("../../model/Payment");

module.exports = function create(req, res, next) {
  try {
    console.log(req);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
