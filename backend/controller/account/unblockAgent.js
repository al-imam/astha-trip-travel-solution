const Agent = require("../../model/Agent");

async function unblockAgent(req, res, next) {
  const status = req.body.status === "approved" ? 1 : 0;

  try {
    await Agent.findByIdAndUpdate(req.body.id, {
      status: status,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = unblockAgent;
