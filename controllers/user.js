const ApiError = require("../error/ApiError");

class UserController {
  registration(req, res) {}
  login(req, res) {}
  check(req, res, next) {
    const id = req.body.id;
    if (!id) {
      return next(ApiError.badRequest("Id not provided"));
    }
    res.json({ message: "checked", id });
  }
}

module.exports = new UserController();
