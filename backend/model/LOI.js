const Schema = require("../database/schema");
const Model = require("../database/Model");

const LOISchema = new Schema({
  guest_name: {
    type: "TEXT(255)",
    req: true,
  },
  pasport_number: {
    type: "TEXT(255)",
    req: true,
  },
  travel_date: {
    type: "text(255)",
    req: true,
  },
  hotel_name: {
    type: "text(255)",
    req: true,
  },
  reference: {
    type: "text(255)",
    req: true,
  },
  price: {
    type: "text(255)",
    req: true,
  },
  pasport_copy: {
    type: "text(255)",
    req: true,
  },
  visa_copy: {
    type: "text(255)",
    req: true,
  },
  hotel_copy: {
    type: "text(255)",
    req: true,
  },
  tiket_copy: {
    type: "text(255)",
    req: true,
  },
  iternary: {
    type: "LONGTEXT",
    req: true,
  },
  country: {
    type: "text(255)",
    req: true,
  },
  visa_application: {
    type: "INT",
    req: true,
  },
  status: {
    type: "text(255)",
    req: true,
  },
  agent: {
    type: "text(255)",
    req: true,
  },
});

const loi_data = new Model(LOISchema, "loi_data");

module.exports = loi_data;
