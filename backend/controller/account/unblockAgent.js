const Agent = require("../../model/Agent");

async function unblockAgent(req, res, next) {
  try {
    await Agent.findByIdAndUpdate(req.body.id, {
      status: 1,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = unblockAgent;
