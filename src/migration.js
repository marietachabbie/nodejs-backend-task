const { Sequelize } = require("sequelize");

const { User } = require("./models/userModel");
const createDatabase = require("./models/db");
const initialUsers = require("./data/initial-users.json");

const db = createDatabase();

const findOrCreateUser = async (userData) => {
  await User.findOrCreate(
    {
      where: {
        id: userData.id,
      },
      defaults: {
        "id": userData.id,
        "balance": userData.balance,
        "createdAt": userData.createdAt
      }
    }
  )
}

const runMigrations = async () => {
  try {
    const fileName = "20231220132131-create-users.js";
    const migration = require(__dirname + '/migrations/' + fileName)
    await migration.up(db.getQueryInterface(), Sequelize);

    for (const userData of initialUsers) {
      await findOrCreateUser(userData);
    }

    console.log("Migrations have been executed successfully.");
  } catch (error) {
    console.error("Error executing migrations:", error);
  } finally {
    await db.close();
  }
}

module.exports = { runMigrations };
