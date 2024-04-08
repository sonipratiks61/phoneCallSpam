const userSchemaBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    phoneNumber: { type: "string" },
    password: { type: "string" }
  },
  required: ["name", "phoneNumber", "password"]
};

module.exports = userSchemaBody;
