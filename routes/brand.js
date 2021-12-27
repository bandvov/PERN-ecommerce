const router = require("express").Router();
const {create,getAll} = require("../controllers/brand");
router.route("/").post(create).get(getAll);

module.exports = router;
