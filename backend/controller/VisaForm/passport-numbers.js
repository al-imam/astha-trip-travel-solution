const Schengen = require("../../model/Schengen");
const Singapore = require("../../model/Singapore");
const Thailand = require("../../model/Thailand");

async function passportNumbers(_, res, next) {
  try {
    const [numbersSchengen] = await Schengen.RawQuery(
      "SELECT passport_number AS 'passport-number' FROM schengen_data"
    );

    const [numbersThailand] = await Thailand.RawQuery(
      "SELECT passport_number AS 'passport-number' FROM thailand_data"
    );
    const [numbersSingapore] = await Singapore.RawQuery(
      "SELECT passport_number AS 'passport-number' FROM singapore_data"
    );

    res.json([numbersSchengen, numbersSingapore, numbersThailand].flat(1));
  } catch (error) {
    next(error);
  }
}

module.exports = passportNumbers;
