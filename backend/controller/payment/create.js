const Payment = require("../../model/Payment");
const Agent = require("../../model/Agent");

function formatDateWithRandomString(agent, admin) {
  const now = new Date();
  return `${now.getFullYear()}${agent}${randomStr(5)}${admin}${
    now.getMonth() + 1
  }${now.getDate()}${now.getHours()}${now.getSeconds()}`;
}

function randomStr(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

module.exports = async function (req, res, next) {
  try {
    const [agent] = await Agent.find({ email: req.body.agent });

    if (!agent) return res.status(404).json({ message: "Not found" });

    await Payment.Add({
      agent: agent.id,
      admin: req.ADMIN.id,
      agent_email: agent.email,
      rate: req.body.rate,
      amount: req.body.amount,
      message: req.body.message,
      transition_id: formatDateWithRandomString(agent.id, req.ADMIN.id),
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
