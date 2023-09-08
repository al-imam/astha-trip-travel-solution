const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("travel-agent-sequelize", "root", null, {
  host: "localhost",
  dialect: "mysql",
  define: {
    underscored: true,
  },
});

module.exports = sequelize;
