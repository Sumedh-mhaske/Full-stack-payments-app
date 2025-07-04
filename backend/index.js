const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

const mainRouter = require("./routes/index");

app.use("/api/v1", mainRouter);

app.listen(port, () => console.log(`App is running on port ${port}`));
