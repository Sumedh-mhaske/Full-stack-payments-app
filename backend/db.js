const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sumedhmhaske310503:SumedhM3153@cluster0.p0wrbtv.mongodb.net/user_info",
);

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
});

const Users = mongoose.model("Users", usersSchema);

module.exports = { Users: Users };
