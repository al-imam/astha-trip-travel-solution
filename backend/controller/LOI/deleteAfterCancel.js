const LOISchema = require("../../model/LOI");

async function deleteController(req, res, next) {
  try {
    await LOISchema.deleteAll({
      reference: req.body.reference,
      status: "cancel",
    });

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = deleteController;
