const Agent = require("../../model/Agent");

module.exports = async function (req, res, next) {
  try {
    await Agent.update({
      set: { photo: req.file.filename },
      where: { id: req.body.id },
    });
    res.json({ success: true, filename: req.file.filename });
  } catch (error) {
    next(error);
  }
};
