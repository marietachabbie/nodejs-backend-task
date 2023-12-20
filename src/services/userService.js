const { User } = require("../models/userModel");

const ALLOWED_MIN_INT = 0;
const ALLOWED_MAX_INT = 2147483647;

const getAll = async () => {
  const users = await User.findAll();
  return users;
}

const getOne = async ({userId}) => {
  const user = await User.findAll({ where: { id: userId } });
  return user;
}

const incrementBalance = async ({ userId, amount }) => {
  const [user] = await User.findAll({ where: { id: userId } });
  if (user.dataValues.balance + amount > ALLOWED_MAX_INT) {
    throw new Error("Balance cannot exceed allowed value")
  }

  return await User.increment({ balance: amount }, { where: { id: userId } });
}

const decrementBalance = async ({ userId, amount }) => {
  const [user] = await User.findAll({ where: { id: userId } });
  if (user.dataValues.balance - amount < ALLOWED_MIN_INT) {
    throw new Error("Balance cannot be negative")
  }

  return await User.decrement({ balance: amount }, { where: { id: userId } });
}

module.exports = {
  getAll,
  getOne,
  incrementBalance,
  decrementBalance,
}
