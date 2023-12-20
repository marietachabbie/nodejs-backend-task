const { Sequelize } = require("sequelize");
const {
  DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} = process.env

const createDatabase = () => {
  return new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
  });
}

module.exports = createDatabase
