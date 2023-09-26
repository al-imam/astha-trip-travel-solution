const Payment = require("../../model/Payment");

module.exports = async function (req, res, next) {
  try {
    const [payments] = await Payment.findAll();

    res.json(payments);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
