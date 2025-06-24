const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../authMiddleware");
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

module.exports = accountRouter;
