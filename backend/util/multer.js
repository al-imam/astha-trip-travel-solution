const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");

module.exports = function getMulter({ destination, regex = /jpeg|jpg/ }) {
  const storageEngine = multer.diskStorage({
    destination: destination,
    filename: (_, file, cb) => {
      cb(
        null,
        `${uuid()}-${file.originalname?.replace(/\s+/g, "-")}`.toLowerCase()
      );
    },
  });

  return multer({
    storage: storageEngine,
    limits: { fileSize: 10000000 * 5 },
    fileFilter: fileFilter(regex),
  });
};

function fileFilter(regex = /jpeg|jpg/) {
  return function (_, file, cb) {
    const extName = regex.test(path.extname(file.originalname).toLowerCase());
    const mimeType = regex.test(file.mimetype);
    if (mimeType && extName) {
      return cb(null, true);
    }

    cb({ message: "You can only upload images jpg, jpeg.", code: "multer" });
  };
}
