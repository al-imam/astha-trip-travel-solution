const LOI = require("../../model/LOI");

function getDateObject(time) {
  const date = new Date(time);
  if (isNaN(date.getDay())) throw "Enter valid date!";
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

function timeQuery(before, after) {
  return `DATE(createdAt) <= CAST('${before.year}-${before.month}-${before.day}' AS DATE) AND DATE(createdAt) >= CAST('${after.year}-${after.month}-${after.day}' AS DATE)`;
}

function agentQuery(email) {
  if (!email) return "";
  return `agent='${JSON.stringify({
    type: "agent",
    username: email,
  })}'`;
}

function combineQuery(agent, date) {
  if (!agent) return date;
  return `${agent} AND ${date}`;
}

async function getAgentByEmailAndDate(req, res, next) {
  try {
    const dateBefore = getDateObject(req.body.dateBefore);
    const dateAfter = getDateObject(req.body.dateAfter);

    const query = `SELECT * FROM loi_data WHERE ${combineQuery(
      agentQuery(req.body.email),
      timeQuery(dateBefore, dateAfter)
    )}`;

    console.log(query);

    const [dbRes] = await LOI.RayQuery(query);

    res.json(dbRes);
  } catch (error) {
    console.log("🚀 ~ getAgentByEmailAndDate ~ error:", error);
    next(error);
  }
}

module.exports = getAgentByEmailAndDate;
