const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sumedhmhaske310503:SumedhM3153@cluster0.p0wrbtv.mongodb.net/user_info",
);

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = { Users };
