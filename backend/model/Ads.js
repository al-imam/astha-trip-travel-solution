const Schema = require("../database/schema");
const Model = require("../database/Model");

const Ads = new Schema({
  admin: { type: "INT", req: true },
  url: { type: "TEXT", req: true },
});

module.exports = new Model(Ads, "Ads");
