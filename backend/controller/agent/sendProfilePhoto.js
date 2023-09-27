const { existsSync } = require("fs");
const path = require("path");

module.exports = async function (req, res, next) {
  const location = path.normalize(
    path.join(__dirname, "..", "..", "upload", "avatar", req.params.name)
  );

  if (existsSync(location)) return res.sendFile(location);
  res.status(404).json({ message: "File not found", code: "NOT FOUND" });
};
