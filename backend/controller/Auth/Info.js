const Admin = require("../../model/Admin");
const jwt = require("jsonwebtoken");

const Info = async (req, res, next) => {
  let AdminDecode = null;
  try {
    const { sort } = req.cookies;

    if (!sort) {
      throw {
        message: "not auth!",
        instanceof: "not auth",
      };
    }

    try {
      const decode = jwt.verify(sort, process.env.JWTT);
      AdminDecode = decode;
    } catch (error) {
      throw {
        message: "not auth token!",
        instanceof: "not auth",
      };
    }
    if (!AdminDecode) {
      throw {
        message: "not auth --!",
        instanceof: "not auth",
      };
    }

    const [AdminListInDB] = await Admin.findAll();

    const [mainUser] = AdminListInDB.filter(
      (e) => e.email === AdminDecode.email && e.username === AdminDecode.user
    );
    if (!mainUser) {
      throw {
        message: "not auth ----!",
        instanceof: "not auth",
      };
    }

    if (!+mainUser.status) {
      throw {
        message: "not auth -----!",
        instanceof: "not auth",
      };
    }

    const payload = {
      ...mainUser,
    };

    delete payload["password"];
    res.send(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = Info;
