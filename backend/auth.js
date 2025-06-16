const zod = require("zod");

const usersSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(8),
});

const updateSchema = zod.object({
  _id: zod.string(),
});

module.exports = { usersSchema, updateSchema };
