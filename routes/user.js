const errorHandler = require("../middleware/errorHandler");
const router = require("express").Router();
const { registration, login, check } = require("../controllers/user");
router.use("/auth", errorHandler);
router.route("/registration").post(registration);
router.route("/login").post(login);
router.route("/auth").post(check);

module.exports = router;
