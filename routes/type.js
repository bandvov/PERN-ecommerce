const router = require("express").Router();
const {create, getAll} = require("../controllers/type");

router.route("/").post(create).get(getAll);

module.exports = router;
