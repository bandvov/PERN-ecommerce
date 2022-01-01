const ApiError = require("../error/ApiError");

module.exports = (userRole) => async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== userRole) {
      
      return next(ApiError.forbidden("Forbidden"));
    }
   return next();
  } catch (error) {
    console.log(error);
    return next(ApiError.badRequest("Internal error"));
  }
};
