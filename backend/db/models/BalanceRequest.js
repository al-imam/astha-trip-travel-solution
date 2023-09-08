const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const BalanceRequest = sequelize.define("BalanceRequest", {
  balance_request_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  transaction_id: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isIn: ["pending", "approved", "rejected"] },
    defaultValue: "pending",
  },
  message: { type: DataTypes.TEXT },
});

module.exports = BalanceRequest;
