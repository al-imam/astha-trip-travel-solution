const Schema = require("../database/schema");
const Model = require("../database/Model");

const Payment = new Schema({
  agent_id: {
    type: "INT",
    req: true,
  },
  amount: {
    type: "INT",
    req: true,
  },
  transition_id: {
    type: "TEXT(255)",
    req: true,
  },
  message: {
    type: "TEXT(255)",
  },
  status: {
    type: "VARCHAR(25)",
    req: true,
  },
});

module.exports = new Model(Payment, "Payment");
