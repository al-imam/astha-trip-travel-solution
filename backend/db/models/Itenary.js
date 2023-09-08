const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Itenary = sequelize.define("Itenary", {
  itenary_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  to: { type: DataTypes.STRING, allowNull: false },
  from: { type: DataTypes.STRING(50), allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Itenary;
