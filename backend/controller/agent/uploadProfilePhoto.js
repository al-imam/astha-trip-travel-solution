module.exports = async function (req, res, next) {
  res.json({ success: true, filename: req.file?.filename });
};
