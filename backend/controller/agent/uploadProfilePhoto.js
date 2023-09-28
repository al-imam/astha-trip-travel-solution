const Agent = require("../../model/Agent");
const { existsSync, unlinkSync } = require("fs");
const { join } = require("path");

module.exports = async function (req, res, next) {
  try {
    const [dbRes] = await Agent.findById(req.body.id);

    const prevFile = join(__dirname, "../../upload/avatar", dbRes?.photo);
    if (dbRes && existsSync(prevFile)) unlinkSync(prevFile);

    await Agent.update({
      set: { photo: req.file.filename },
      where: { id: req.body.id },
    });

    res.json({ success: true, filename: req.file.filename });
  } catch (error) {
    next(error);
  }
};
