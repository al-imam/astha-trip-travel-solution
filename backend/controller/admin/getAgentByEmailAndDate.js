const LOI = require("../../model/LOI");

function getDateObject(time) {
  if (!time) return null;
  const date = new Date(time);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

function timeQuery(before, after) {
  if (!before || !after) return "";
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
  if (agent && date) return `WHERE ${agent} AND ${date}`;
  if (agent) return "WHERE " + agent;
  if (date) return "WHERE " + date;
  return "";
}

async function getAgentByEmailAndDate(req, res, next) {
  try {
    const dateBefore = getDateObject(req.body.dateBefore);
    const dateAfter = getDateObject(req.body.dateAfter);

    const query = `SELECT * FROM loi_data ${combineQuery(
      agentQuery(req.body.email),
      timeQuery(dateBefore, dateAfter)
    )}`;

    const [dbRes] = await LOI.RawQuery(query);

    res.json(dbRes);
  } catch (error) {
    console.log("🚀 ~ getAgentByEmailAndDate ~ error:", error);
    next(error);
  }
}

module.exports = getAgentByEmailAndDate;
