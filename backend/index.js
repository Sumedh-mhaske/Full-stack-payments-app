const express = require("express");
const app = express();
const { Users } = require("./db");
const { usersSchema } = require("./auth");
const cors = require("cors");
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/signup", (req, res) => {});

app.post("/signin", async (req, res) => {
  const usersInfo = req.body;
  const parsedUsersInfo = usersSchema.safeParse(usersInfo);

  if (!parsedUsersInfo.success) {
    res.status(411).json({
      msg: "You sent the wrong input",
    });
    return;
  }

  await Users.create({
    firstName: usersInfo.firstName,
    lastName: usersInfo.lastName,
    password: usersInfo.password,
  });

  res.json({
    msg: "Users added successfully",
  });
});

app.put("/update_info", (req, res) => {});

app.listen(port, () => console.log(`App is running on port ${port}`));
