const router = require("express").Router();
const { create, getAll, getOne } = require("../controllers/device");
const authMiddleware = require("../middleware/authMiddleware");
const checkIsAdmin = require("../middleware/checkIsAdmin");

router.route("/").post(authMiddleware).post(checkIsAdmin("ADMIN")).post(create).get(getAll);
router.route("/:id").get(getOne);

module.exports = router;
