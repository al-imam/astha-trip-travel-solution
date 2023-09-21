const Schengen = require("../../model/Schengen");
const Singapore = require("../../model/Singapore");
const Thailand = require("../../model/Thailand");

async function passportNumbers(_, res, next) {
  try {
    const [numbersSchengen] = await Schengen.RayQuery(
      "SELECT passport_number AS 'passport-number' FROM schengen_data"
    );

    const [numbersThailand] = await Thailand.RayQuery(
      "SELECT passport_number AS 'passport-number' FROM thailand_data"
    );
    const [numbersSingapore] = await Singapore.RayQuery(
      "SELECT passport_number AS 'passport-number' FROM singapore_data"
    );

    res.json([numbersSchengen, numbersSingapore, numbersThailand].flat(1));
  } catch (error) {
    next(error);
  }
}

module.exports = passportNumbers;
