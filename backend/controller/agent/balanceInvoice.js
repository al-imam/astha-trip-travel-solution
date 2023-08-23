const BalanceReq = require("../../model/BalanceReq");

async function balanceInvoice(req, res, next) {
  try {
    const dbRes = await BalanceReq.find({ agent_id: req.params.agent_id });
    res.json(dbRes);
  } catch (e) {
    console.log("invoice-balance-agent", e);
    next(e);
  }
}

module.exports = balanceInvoice;
