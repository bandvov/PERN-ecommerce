const router = require("express").Router();
const { create, getAll, getOne } = require("../controllers/device");

router.route("/").post(create).get(getAll);
router.route("/:id").get(getOne);

module.exports = router;
