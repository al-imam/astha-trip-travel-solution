const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define("Admin", {
  admin_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isIn: ["super-admin", "regular-admin", "temporary-admin"] },
    defaultValue: "super-admin",
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },

  photo: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING(50), allowNull: false },
});

module.exports = Admin;
