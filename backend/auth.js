const zod = require("zod");

const usersSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(8),
});

module.exports = { usersSchema: usersSchema };
