module.exports = async function (req, res, next) {
  console.log(req.files);
  res.json({ success: true });
};
