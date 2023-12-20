const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const { runMigrations } = require("./migration");
const homeRoute = require("./routes/homeRoute");
const usersRoute = require("./routes/userRoute");

const app = express();
app.use(bodyParser.json());
app.use("/", homeRoute);
app.use("/users", usersRoute);

runMigrations()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error starting the app:', error);
  });

module.exports = app
