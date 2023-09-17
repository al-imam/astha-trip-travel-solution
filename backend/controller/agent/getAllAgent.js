const Agent = require("../../model/Agent");

async function getAllAgent(req, res, next) {
  try {
    const [agents] = await Agent.findAll();
    res.json(agents);
    
  } catch (e) {
    next(e);
  }
}

module.exports = getAllAgent;
