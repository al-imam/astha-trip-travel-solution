const Agent = require("../../model/Agent");
const Admin = require("../../model/Admin");
const jwt = require("jsonwebtoken");

async function isAuthenticate(req, res, next) {
  try {
    const User = {};

    if (!req.cookies.sort && !req.cookies.offer) {
      return res.status(401).json({ message: "unauthorized", code: "invalid" });
    }

    if (req.cookies.sort) {
      try {
        const admin = jwt.verify(req.cookies.sort, process.env.JWTT);
        const [adminDB] = await Admin.findById(admin.id);
        if (adminDB) User.Admin = adminDB;
      } catch (error) {
        console.log("🚀 ~ admin ~ isAuthenticate ~ error:", error);
      }
    } else {
      try {
        const agent = jwt.verify(req.cookies.offer, process.env.JWTT);
        const [agentDB] = await Agent.findById(agent.id);
        if (agentDB) User.Agent = agentDB;
      } catch (error) {
        console.log("🚀 ~ agent ~ isAuthenticate ~ error:", error);
      }
    }

    req.User = User;

    if (User.Admin) {
      return next();
    }

    if (User.Agent && User.Agent.status === 1) {
      return next();
    }

    if (User.Agent && User.Agent.status === 403) {
      return res.status(403).json({
        message: "Permission denied!",
        code: "blocked-agent",
      });
    }

    return res.status(401).json({
      message: "Permission denied!",
      code: "auth-failed",
    });
  } catch (error) {
    console.log("🚀 ~ isAuthenticate ~ error:", error);
    return next(error);
  }
}

module.exports = isAuthenticate;
