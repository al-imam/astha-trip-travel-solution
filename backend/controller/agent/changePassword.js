const Agent = require("../../model/Agent");
const bcrypt = require("bcrypt");
//TODO: change password notify for 3 month
async function changePassword(req, res, next) {
  try {
    if (!bcrypt.compareSync(req.body["current-password"], req.AGENT.password)) {
      return res.status(400).json({
        message: "Email and password not match!",
        code: "invalid-password",
      });
    }

    await Agent.findByIdAndUpdate(req.AGENT.id, {
      password: bcrypt.hashSync(req.body.password, 10),
    });

    res.clearCookie("offer");

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = changePassword;
