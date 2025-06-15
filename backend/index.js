const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const { Users } = require("./db");
const { usersSchema, updateSchema } = require("./auth");
const cors = require("cors");
const port = 3000;

app.use("/api/v1", mainRouter);
app.use(express.json());
app.use(cors());

function authMiddleware(req, res, next) {
  const usersInfo = req.body;
  const parsedUsersInfo = usersSchema.safeParse(usersInfo);

  if (!parsedUsersInfo.success) {
    res.status(411).json({
      msg: "You sent the wrong input",
    });
    return;
  } else {
    next();
  }
}

app.get("/signup", async (req, res) => {
  const data = await Users.findOne(req.body);

  res.json({
    data,
  });
});

app.post("/signin", authMiddleware, async (req, res) => {
  const usersInfo = req.body;

  await Users.create({
    firstName: usersInfo.firstName,
    lastName: usersInfo.lastName,
    password: usersInfo.password,
  });

  res.json({
    msg: "User added successfully",
  });
});

app.put("/update_info", async (req, res) => {});

app.listen(port, () => console.log(`App is running on port ${port}`));
