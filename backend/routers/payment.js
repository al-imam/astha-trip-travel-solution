const create = require("../controller/payment/create");

const router = require("express").Router();

router.post("/create", create);

module.exports = router;
