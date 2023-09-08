const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Agent = sequelize.define("Agent", {
  agent_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isIn: ["pending", "approved", "canceled", "blocked"] },
  },

  name: { type: DataTypes.STRING, allowNull: false },
  nid_no: { type: DataTypes.STRING(50), allowNull: false },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },

  password: { type: DataTypes.STRING, allowNull: false },
  photo: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING(50), allowNull: false },
  balance: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  rate: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 },
  session: { type: DataTypes.STRING },
});

module.exports = Agent;
