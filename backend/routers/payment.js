const { isString, isNumber } = require("nested-object-validate");
const create = require("../controller/payment/create");
const payments = require("../controller/payment/payments");
const isAdmin = require("../middleware/Auth/isAdmin");
const validateBody = require("../middleware/validator/validateBody");
const status = require("../controller/payment/status");

const router = require("express").Router();

router.post(
  "/create",
  validateBody([
    isNumber("rate", true),
    isNumber("amount", true),
    isString("agent"),
  ]),
  isAdmin,
  create
);

router.get("/", isAdmin, payments);
router.post("/status", status);

module.exports = router;
