const Payment = require("../../model/Payment");
const Loi = require("../../model/LOI");

const Status = async function (req, res, next) {
  try {
    const agent = { type: "agent", username: req.body.email };

    const [[{ numberOfRequest }]] = await Loi.RawQuery(
      `Select count(*) AS numberOfRequest From loi_data WHERE agent='${JSON.stringify(
        agent
      )}'`
    );

    const [[{ numberOfCanceledRequest }]] = await Loi.RawQuery(
      `Select count(*) AS numberOfCanceledRequest From loi_data WHERE agent='${JSON.stringify(
        agent
      )}' AND status='cancel'`
    );

    const payments = await Payment.find({ agent: req.body.agent_id });

    const totalPaid = payments.reduce((acc, v) => acc + v.amount, 0);

    res.json({
      totalPaid,
      numberOfRequest,
      duePayment: numberOfRequest - totalPaid,
      numberOfCanceledRequest,
    });
  } catch (error) {
    next(error);
  }
};

const agentGet = async function (req, res, next) {
  try {
    const agent = { type: "agent", username: req.AGENT.email };

    const [[{ numberOfRequest }]] = await Loi.RawQuery(
      `Select count(*) AS numberOfRequest From loi_data WHERE agent='${JSON.stringify(
        agent
      )}'`
    );

    const [[{ numberOfCanceledRequest }]] = await Loi.RawQuery(
      `Select count(*) AS numberOfCanceledRequest From loi_data WHERE agent='${JSON.stringify(
        agent
      )}' AND status='cancel'`
    );

    const payments = await Payment.find({ agent: req.body.agent_id });

    const totalPaid = payments.reduce((acc, v) => acc + v.amount, 0);

    res.json({
      totalPaid,
      numberOfRequest,
      duePayment: numberOfRequest - totalPaid,
      numberOfCanceledRequest,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  agentGet,
  Status,
};
