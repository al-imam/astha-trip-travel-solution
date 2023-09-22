const LOI = require("../../model/LOI");

async function getLOIById(req, res, next) {
  try {
    const con = JSON.stringify({ type: "agent", username: req.AGENT.email });

    const [dbRes] = await LOI.RawQuery(`
    SELECT * FROM loi_data WHERE agent='${con.replace("\n", "")}'
    `);

    res.json(dbRes);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = getLOIById;
