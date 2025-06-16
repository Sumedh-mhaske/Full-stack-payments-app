const express = require("express");
const app = express();
const port = 3000;

const mainRouter = require("./routes/index");
const cors = require("cors");

app.use("/api/v1", mainRouter);
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`App is running on port ${port}`));
