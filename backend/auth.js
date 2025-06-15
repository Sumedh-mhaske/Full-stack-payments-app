const zod = require("zod");

const usersSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(8),
});

const updateSchema = zod.object({
  _id: zod.string(),
});

module.exports = { usersSchema, updateSchema };
