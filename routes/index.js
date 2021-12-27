const router = require("express").Router();
const brandRouter = require("./brand");
const deviceRouter = require("./device");
const typeRouter = require("./type");
const userRouter = require("./user");

router.use("/brand", brandRouter);
router.use("/type", typeRouter);
router.use("/device", deviceRouter);
router.use("/user", userRouter);

module.exports = router;
