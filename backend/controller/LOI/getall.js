const LOI = require("../../model/LOI");

const GetAll = async (req, res, next) => {
  try {
    const [resdb] = await LOI.findAll();
    res.json(resdb);
  } catch (error) {
    console.log("🚀 ~ file: getall.js:5 ~ GetAll ~ error:", error);
    next(error);
  }
};

module.exports = GetAll;
