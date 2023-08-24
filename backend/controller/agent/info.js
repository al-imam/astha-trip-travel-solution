const jwt = require("jsonwebtoken");
const Agent = require("../../model/Agent");

async function getInfo(req, res, next) {
  try {
    let values = false;

    try {
      values = jwt.verify(req.cookies.offer, process.env.JWTT);
    } catch (error) {
      // console.log('not auth agent');
      values = false;
    }
    if (!values) {
      return res.status(401).json({
        message: "Permission denied!",
        code: "verify-failed 1",
      });
    }
    const [user] = await Agent.findById(values.id);

    if (user?.session !== values.dict) {
      return res.status(401).json({
        message: "Permission denied!",
        code: "verify-failed",
      });
    }
    if (user?.status === 403){
      return res.status(401).json({
        message: "Permission denied!",
        code: "verify-failed",
      });
    }

    return res.json(remove(user));
  } catch (e) {
    console.log(e);

    res.status(401).json({
      message: "Permission denied!",
      code: "verify-failed",
    });
  }
}

function remove(values) {
  delete values.password;
  delete values.session;
  return values;
}

// const l = { name, photo, rate, balance, nid_no, admin, phone, email, status }

module.exports = getInfo;
