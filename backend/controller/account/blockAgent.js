const Agent = require("../../model/Agent");

async function blockAgent(req, res, next) {
  try {
    await Agent.findByIdAndUpdate(req.body.id, {
      status: 403,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = blockAgent;
