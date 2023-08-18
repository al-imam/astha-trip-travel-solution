const { validate } = require("nested-object-validate");

function validateBody(validators, config) {
  return async (req, res, next) => {
    if (!(typeof req.body === "object" && !Array.isArray(req.body))) {
      return res.status(400).json({
        code: "not-object",
        message: "request body is not object only accept's object",
      });
    }

    const result = validate(Object.assign({}, req.body), validators, config);

    if (result.valid) {
      if (
        typeof req.$data === "object" &&
        !Array.isArray(req.$data) &&
        req.$data !== null
      ) {
        req.$data = Object.assign(req.$data, result.checked);
      } else {
        req.$data = result.checked;
      }

      return next();
    }

    return res.status(400).json({
      message: "some properties are missing or invalid",
      missing: result.missing,
      invalid: result.invalid,
    });
  };
}

module.exports = validateBody;
