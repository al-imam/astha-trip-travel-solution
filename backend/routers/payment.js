const create = require("../controller/payment/create");
const isAdmin = require("../middleware/Auth/isAdmin");

const router = require("express").Router();

router.post("/create", isAdmin, create);

module.exports = router;
