const { isString, isNumber } = require("nested-object-validate");
const create = require("../controller/payment/create");
const payments = require("../controller/payment/payments");
const isAdmin = require("../middleware/Auth/isAdmin");
const isAgent = require("../middleware/Auth/isAgent");
const validateBody = require("../middleware/validator/validateBody");
const { agentGet, Status } = require("../controller/payment/status");

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
router.post("/status", isAdmin, Status);
router.get("/status", isAgent, agentGet);

module.exports = router;
