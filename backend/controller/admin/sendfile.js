const { existsSync } = require("fs");
const { join } = require("path");

function sendfile(req, res, next) {
  const file = join(__dirname, "../../upload/loireqfile", req.params.filename);

  if (!existsSync(file)) {
    return res.status(404).json({
      message: "file not found!",
      code: "not-exist",
    });
  }

  res.sendFile(file);
}

module.exports = sendfile;
