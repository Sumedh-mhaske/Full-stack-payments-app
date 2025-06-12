const express = require("express");
const app = express();
const port = 3000;

app.get("/todo", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log(`App is running on ${port}`));
