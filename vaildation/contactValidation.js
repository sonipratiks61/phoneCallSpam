const userContactBody = {
  type: "array",
  items: {
    type: "object",
    properties: {
      name: { type: "string" },
      phoneNumber: { type: "string" },
      email: { type: "string" }
    },
    required: ["name", "phoneNumber"]
  }
};

const userUpdateContactBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    phoneNumber: { type: "string" },
    email: { type: "string" }
  },
  required: ["name", "phoneNumber"]
};

const userContactParams = {
  type: "object",
  properties: {
    contactId: { type: "integer" }
  },
  required: ["contactId"]
  //   additionalProperties: false
};

module.exports = { userContactBody, userContactParams, userUpdateContactBody };
