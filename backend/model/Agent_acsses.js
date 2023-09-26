const Schema = require("../database/schema");
const Model = require("../database/Model");
const Agent_access = new Schema({
  agent_id: {
    type: "INT",
    req: true,
  },
  visa_form: {
    type: "LONGTEXT",
    req: true,
  },
  status: {
    type: "VARCHAR(255)",
    req: true,
  },
});

const agent_access = new Model(Agent_access, "Agent_access");

module.exports = agent_access;
