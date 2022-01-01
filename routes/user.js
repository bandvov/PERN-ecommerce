const router = require("express").Router();
const { registration, login, check } = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleware");

router.use("/auth", authMiddleware);
router.route("/registration").post(registration);
router.route("/login").post(login);
router.route("/auth").post(check);

module.exports = router;
