const UploadTempPhoto = async (req, res) => {
  const response = {
    passpor: {
      name: req.files?.imgpasport[0]?.filename,
    },
    visa: {
      name: req.files?.imgvisa ? req.files?.imgvisa[0]?.filename : null,
    },
    hotelbooking: {
      name: req.files?.hotel ? req.files?.hotel[0]?.filename : null,
    },
    tiket: {
      name: req.files?.ticket ? req.files?.ticket[0]?.filename : null,
    },
    passportSizePhoto: {
      name: req.files["passport-size-photo"]
        ? req.files["passport-size-photo"][0]?.filename
        : null,
    },
  };
  res.send({
    ...response,
  });
};

module.exports = UploadTempPhoto;
