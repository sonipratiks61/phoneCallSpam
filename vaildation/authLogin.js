const userLoginBody = {
  type: "object",
  properties: {
    phoneNumber: { type: "string" },
    password: { type: "string" }
  },
  required: ["phoneNumber", "password"]
};

module.exports = userLoginBody;
