const Agent = require("../../model/Agent");
const SendMail = require("../../util/SendMail");
const bcrypt = require("bcrypt");

function mail(pass) {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Astha trip</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Your password is rested by admin. New Password is - </p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${pass}</h2>
    <p>Change your password after login</p>
    <p style="font-size:0.9em;">Regards,<br />Astha trip</p>
  </div>
</div>`;
}

function generatePassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

async function resetPassword(req, res, next) {
  try {
    const password = generatePassword(6);

    await Agent.findByIdAndUpdate(req.body.id, {
      password: bcrypt.hashSync(password, 10),
    });

    const [dbAgent] = await Agent.findById(req.body.id);
    await SendMail(
      [dbAgent.email],
      [],
      "Astha trip - password reset",
      `Your password was reset by astha trip, login with this new password - ${password}`,
      mail(password),
      []
    );

    res.json({ success: true });
  } catch (e) {
    console.log("🚀 ~ resetPassword ~ e:", e);
    next(e);
  }
}

module.exports = resetPassword;
