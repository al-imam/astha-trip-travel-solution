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
    <p>You are now approved agent of astha trip, login your loi dashboard with this password.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${pass}</h2>
    <p>Change your password after login</p>
    <p style="font-size:0.9em;">Regards,<br />Astha trip</p>
  </div>
</div>`;
}

function generatePassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

async function approve(req, res, next) {
  try {
    const password = generatePassword(6);
   
    console.log("🚀 ~ file: approve.js:34 ~ approve ~ req.ADMIN:", req.ADMIN)
    await Agent.findByIdAndUpdate(req.body.id, {
      status: 1,
      admin: req.ADMIN.username,
      rate: 100,
      balance: 0,
      password: bcrypt.hashSync(password, 10),
    });

    const [dbAgent] = await Agent.findById(req.body.id);
    console.log("🚀 ~ file: approve.js:43 ~ approve ~ dbAgent:", dbAgent.email)

    await SendMail(
      [dbAgent.email],
      [],
      "Astha trip approve email",
      `you're approved by astha trip, login with this password - ${password}`,
      mail(password),
      []
    );

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
}

module.exports = approve;
