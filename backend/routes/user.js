const express = require("express");
const { usersSchema, signupSchema, updateSchema } = require("../auth");
const jwt = require("jsonwebtoken");
const { Users } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../authMiddleware");
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

router.post("/signin", async (req, res) => {
  const usersInfo = req.body;
  const parsedUsersInfo = signupSchema.safeParse(usersInfo);

  if (!parsedUsersInfo.success) {
    return res.status(411).json({
      msg: "Error while loging in",
    });
  }

  const userFound = await Users.findOne(usersInfo);

  if (!userFound) {
    return res.status(411).json({
      msg: "Error while loging in",
    });
  }

  const token = jwt.sign(
    {
      userId: userFound._id,
    },
    JWT_SECRET,
  );

  res.status(200).json({
    token: token,
  });
});

router.put("/update", authMiddleware, async (req, res) => {
  const usersInfo = req.body;
  const { success } = updateSchema.safeParse(usersInfo);

  if (!success) {
    return res.status(411).json({
      msg: "Error while updating informing",
    });
  }

  await Users.updateOne(
    {
      _id: req.userId,
    },
    usersInfo,
  );

  res.json({
    msg: "Information updated successfully",
  });
});

module.exports = userRouter;
