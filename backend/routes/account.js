const express = require("express");
const { Account } = require("../db");
const authMiddleware = require("../authMiddleware");
const mongoose = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(411).send({
      msg: "User does not exits",
    });
  }

  const account = await Account.findOne({
    userId,
  });

  res.json(200).send({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  // Starting the session
  const session = await mongoose.startSession();

  // Creating the transaction
  session.startTransaction();
  const { to, amount } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  // Aborting transaction if something error happnes
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Decreasing amount for sending account
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } },
  ).session(session);

  // Increasing amount in receving account
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } },
  ).session(session);

  // Commiting the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = accountRouter;
