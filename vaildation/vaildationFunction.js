const Ajv = require("ajv");
const { sendBadRequest } = require("../util/customResponse");
function validateBody(schema) {
  const ajv = new Ajv({ allErrors: true });
  ajv.addFormat("phoneNumber", (data) => {
    // Use a regular expression to validate email format
    const phoneRegex = /^(\+[1-9]{1}[0-9]{1,3})?[0-9]{9}$/;
    return phoneRegex.test(data);
  });

  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const isValid = validate(req.body);

    if (!isValid) {
      return sendBadRequest(res, "Validation Error!", validate.errors);
    }
    next();
  };
}

function validateParams(schema) {
  const ajv = new Ajv({ allErrors: true, coerceTypes: true });
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const isValid = validate(req.params);
    if (!isValid) {
      return sendBadRequest(res, "Validation Error!", validate.errors);
    }
    next();
  };
}
module.exports = { validateBody, validateParams };
