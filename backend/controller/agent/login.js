const Agent = require("../../model/Agent");
const bcript = require("bcrypt");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const Login = async (req, res) => {
  const [user] = await Agent.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      message: "User not found!",
      code: "not-found",
    });
  }

  if (!bcript.compareSync(req.body.password, user.password)) {
    return res.status(403).json({
      message: "User name and password not match!",
      code: "not-match",
    });
  }

  if (user.status === 403) {
    return res.status(403).json({
      message: "You're blocked",
      code: "blocked-agent",
    });
  }

  const session = v4();

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      admin: user.admin,
      rate: user.rate,
      status: user.status,
      dict: session,
    },
    process.env.JWTT
  );

  await Agent.update({ set: { session }, where: { id: user.id } });

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("offer", token, {
      maxAge: 1 * 24 * 60 * 60,
      sameSite: "strict",
      path: "/",
      httpOnly: true,
    })
  );

  res.json({ success: true, token });
};

module.exports = Login;
