const responseCodes = {
    success: 200,
    createSuccessfully: 201,
    badRequest: 400,
    authenticationFaild: 401,
    notFound: 404,
    internalError: 500,
  };
  
  const sendResponse = (res, resCode, message, data = {}, error = {}) => {
    res.status(resCode).json({
      success: resCode <= 201 ? true : false,
      data,
      message: message,
      error,
    });
  };
  
  exports.sendSuccess = (res, message, data = {}) => {
    sendResponse(res, responseCodes.success, message, data);
  };
  
  exports.sendCreateObject = (res, message) => {
    sendResponse(res, responseCodes.createSuccessfully, message);
  };
  
  exports.sendBadRequest = (res, message, error = {}) => {
    sendResponse(res, responseCodes.badRequest, message, {}, error);
  };
  
  exports.sendAuthenticationFaild = (res, message) => {
    sendResponse(res, responseCodes.authenticationFaild, message);
  };
  
  exports.sendNotFound = (res, message) => {
    sendResponse(res, responseCodes.notFound, message);
  };
  
  exports.sendInternalError = (res, message) => {
    sendResponse(res, responseCodes.internalError, message);
  };
  