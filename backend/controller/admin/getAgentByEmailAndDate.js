const LOI = require("../../model/LOI");

async function getAgentByEmailAndDate(req, res, next) {
  try {
    const jsonAgent = JSON.stringify({
      type: "admin",
      username: req.body.email,
    });

    const date = new Date(req.body.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    console.log(jsonAgent, req.body.date);

    const res = await LOI.RayQuery(
      `SELECT * FROM loi_data WHERE agent='${jsonAgent}' AND DATE(createdAt)=CAST('${year}-${month}-${day}' AS DATE)`
    );

    console.log(jsonAgent, req.body.date, res);

    res.send(req.body.date);
  } catch (error) {
    console.log("🚀 ~ getAgentByEmailAndDate ~ error:", error);
    next(error);
  }
}

module.exports = getAgentByEmailAndDate;
