const Permission_DB = require("../../model/Agent_acsses");
const permission = async (req, res) => {
  try {
    const { id } = req.body;
    const [ServerRes] = await Permission_DB.find({ agent_id: id });
    if (!ServerRes) {
      const resdd = await Permission_DB.Add({
        agent_id: id,
        visa_form: "pending",
        //TODO this will change on any update future in
        status: "1",
      });

      return res.send({
        id: resdd.insertId,
        agent_id: id,
        visa_form: "pending",
        status: "1",
      });
    }

    return res.status(200).send(ServerRes);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = permission;
