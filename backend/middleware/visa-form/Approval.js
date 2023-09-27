const agent_access = require("../../model/Agent_acsses");
const LOI_DATABASE = require("../../model/LOI");

const Visa_Approval = async (req, res, next) => {
  try {
    const LOI_ref = req.body.reference;

    let status = "pending";

    if (LOI_ref) {
      // cack loi
      const [Loi] = await LOI_DATABASE.find({
        id: LOI_ref,
      });

      if (Loi) {
        if (Loi.visa_application == 0) {
          if (Loi.status === "approved") {
            status = "approved";
          }
        } else {
          return res
            .status(400)
            .send(
              "the request s not valid reference LOI request already has a Form Data!"
            );
        }
      }
    }

    if (req.User?.Admin) {
      status = "approved";
    } else if (req.User.Agent) {
      const [Access] = await agent_access.find({
        agent_id: req.User?.Agent.id,
      });

      if (Access?.visa_form) {
        if (Access?.visa_form === "auto") {
          status = "approved";
        } else if (Access?.visa_form === "block") {
          return res
            .status(403)
            .send("You are block to submit any visa form application");
        }
      } else {
        status = "pending";
      }

      // console.log("strat");
      // res.status(500).send("okk");
    }
    req.STATUS = status;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = Visa_Approval;
