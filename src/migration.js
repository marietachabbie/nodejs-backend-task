const { Sequelize } = require("sequelize");
const createDatabase = require("./models/db");

const db = createDatabase();
const fs = require("fs");

const runMigrations = async () => {
  try {
    const migrations = fs.readdirSync(__dirname + '/migrations')
    for(const fileName of migrations) {
      const migration = require(__dirname + '/migrations/' + fileName)
      await migration.up(db.getQueryInterface(), Sequelize);
    }

    console.log("Migrations have been executed successfully.");
  } catch (error) {
    console.error("Error executing migrations:", error);
  } finally {
    await db.close();
  }
}

module.exports = { runMigrations };
