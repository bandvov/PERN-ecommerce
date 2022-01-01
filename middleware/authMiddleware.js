const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!/bearer/i.test(req.headers.authorization)) {
    return next(ApiError.notAuthorized("User not authorized!"));
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(ApiError.badRequest("Token expired!"));
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return next(ApiError.badRequest("Internal error"));
  }
};
