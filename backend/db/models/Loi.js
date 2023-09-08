const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Loi = sequelize.define("Loi", {
  loi_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isIn: ["pending", "approved", "canceled"] },
  },

  visa_copy: { type: DataTypes.STRING },
  ticket_copy: { type: DataTypes.STRING },
  hotel_copy: { type: DataTypes.STRING },
  hotel_name: { type: DataTypes.STRING, allowNull: false },
  travel_date: { type: DataTypes.DATE, allowNull: false },
  reference: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING(50), allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  submitted_by: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Loi;
