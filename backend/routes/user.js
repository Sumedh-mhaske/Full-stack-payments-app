const express = require("express");
const { usersSchema, signinSchema, updateSchema } = require("../auth");
const jwt = require("jsonwebtoken");
const { Users, Account } = require("../db");
const JWT_SECRET = require("../config");
const authMiddleware = require("../authMiddleware");
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const usersInfo = req.body;
  const parsedUsersInfo = usersSchema.safeParse(usersInfo);

  if (!parsedUsersInfo.success) {
    return res.status(400).json({
      msg: "Incorrect inputs",
    });
  }

  const existingUser = await Users.findOne({
    username: usersInfo.username,
  });

  if (existingUser) {
    return res.status(409).json({
      msg: "Email is already taken",
    });
  }

  const createdUser = await Users.create(usersInfo);

  await Account.create({
    userId: createdUser._id,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId: createdUser._id,
    },
    JWT_SECRET,
  );

  res.status(201).json({
    msg: "User created successfully",
    token: token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const usersInfo = req.body;
  const parsedUsersInfo = signinSchema.safeParse(usersInfo);

  if (!parsedUsersInfo.success) {
    return res.status(411).json({
      msg: "Incorrect inputs",
    });
  }

  const userFound = await Users.findOne(usersInfo);

  if (!userFound) {
    return res.status(411).json({
      msg: "User not found",
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

userRouter.put("/update", authMiddleware, async (req, res) => {
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

userRouter.get("/bulk", async (req, res) => {
  const { filter } = req.query || "";

  const foundedUser = await Users.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    users: foundedUser.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = userRouter;
