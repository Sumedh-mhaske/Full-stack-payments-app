const express = require("express");
const { usersSchema } = require("../auth");
const jwt = require("jsonwebtoken");
const { Users } = require("../db");
const JWT_SECRET = require("../config");
const userRouter = express.Router();

router.post("/signup", async (req, res) => {
  const usersInfo = req.body;
  const parsedUsersInfo = usersSchema.safeParse(usersInfo);

  if (!parsedUsersInfo.success) {
    return res.json({
      msg: "Email is already taken / incorrect inputs",
    });
  }

  const existingUser = Users.findOne({
    username: usersInfo.username,
  });

  if (existingUser) {
    return res.json({
      msg: "Email is already taken / incorrect inputs",
    });
  }

  const createdUser = await Users.create(usersInfo);

  const token = jwt.sign(
    {
      userId: createdUser._id,
    },
    JWT_SECRET,
  );

  res.json({
    msg: "User created successfully",
    token: token,
  });
});

module.exports = userRouter;
