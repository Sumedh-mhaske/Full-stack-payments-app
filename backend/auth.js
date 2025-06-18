const zod = require("zod");

const usersSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(8),
});

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8),
});

const updateSchema = zod.object({
  username: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

module.exports = { usersSchema, updateSchema, signupSchema };
