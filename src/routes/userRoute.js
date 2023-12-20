const express = require('express');
const router = express.Router();

const userService = require("../services/userService");

router.get("/", async (req, res) => {
  const allUsers = await userService.getAll();
  res.send(allUsers);
})

router.get("/:userId", async (req, res) => {
  const user = await userService.getOne(req.params);
  res.send(user);
})

router.post("/increment", async (req, res) => {
  try {
    const user = await userService.incrementBalance(req.body);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(418).send(error.message);
  }
})

router.post("/decrement", async (req, res) => {
  try {
    const user = await userService.decrementBalance(req.body);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(418).send(error.message);
  }
})

module.exports = router;
