const userSpamContactBody = {
  type: "object",
  properties: {
    phoneNumber: { type: "string" }
  },
  required: ["phoneNumber"]
};
const userSpamContactParams = {
  type: "object",
  properties: {
    phoneNumber: { type: "string" }
  },
  required: ["phoneNumber"]
  //   additionalProperties: false
};
module.exports = { userSpamContactBody, userSpamContactParams };
