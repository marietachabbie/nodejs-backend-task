const { Sequelize, DataTypes } = require("sequelize");
const createDatabase = require("./db");

const db = createDatabase();

const User = db.define("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10),
    allowNull: false,
    defaultValue: 10000,
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  }
}, {
  timestamps: false
});

module.exports = { User };
