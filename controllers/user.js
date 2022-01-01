const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @param {number} id
 * @param {string} email
 * @param {string} role
 * @returns {string} token
 */
function generateToken(id, email, role) {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: "20min",
  });
}
class UserController {
  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("email or password not provided"));
    }
    try {
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest("User already exists!"));
      }
      const hashedPassword = bcrypt.hashSync(password, 5);

      const user = await User.create({ email, password: hashedPassword });
      if (user) {
        res.json({ email, message: "User created!" });
      }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("email or password not provided"));
    }
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.notFound("User not found"));
      }
      const comparePassword = await bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.badRequest("Incorrect password"));
      }
      const token = generateToken(user.id, email, user.role);
      return res.json({ email: user.email, token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  check(req, res, next) {
    const token = generateToken(req.user.id, req.user.email);
    return res.json({ token });
  }
}

module.exports = new UserController();
