const { isString, isNumber } = require("nested-object-validate");
const create = require("../controller/payment/create");
const isAdmin = require("../middleware/Auth/isAdmin");
const validateBody = require("../middleware/validator/validateBody");

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

module.exports = router;
