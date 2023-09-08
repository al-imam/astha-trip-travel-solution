const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Guest = sequelize.define("Guest", {
  guest_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING, allowNull: false },
  passport_number: { type: DataTypes.STRING(50), allowNull: false },
  passport_copy: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING(50), allowNull: false },
});

module.exports = Guest;
