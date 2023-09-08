const Admin = require("./Admin");
const Agent = require("./Agent");
const Itenary = require("./Itenary");
const BalanceRequest = require("./BalanceRequest");
const Loi = require("./Loi");
const Guest = require("./Guest");

Admin.hasMany(Agent, {
  foreignKey: "admin_id",
  as: "agents",
});

Agent.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "admin",
});

Admin.hasMany(BalanceRequest, {
  foreignKey: "admin_id",
  as: "balance_requests",
});

BalanceRequest.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "admin",
});

Agent.hasMany(Guest, {
  foreignKey: "agent_id",
  as: "guests",
});

Guest.belongsTo(Agent, {
  foreignKey: "agent_id",
  as: "agent",
});

Agent.hasMany(BalanceRequest, {
  foreignKey: "agent_id",
  as: "balance_requests",
});

BalanceRequest.belongsTo(Agent, {
  foreignKey: "agent_id",
  as: "agent",
});

Loi.hasMany(Itenary, {
  foreignKey: "loi_id",
  as: "itenary",
});

Itenary.belongsTo(Loi, {
  foreignKey: "loi_id",
  as: "loi",
});

Guest.hasMany(Loi, {
  foreignKey: "guest_id",
  as: "lois",
});

Loi.belongsTo(Guest, {
  foreignKey: "guest_id",
  as: "guest",
});

module.exports = { Admin, Agent, Itenary, BalanceRequest, Loi, Guest };
