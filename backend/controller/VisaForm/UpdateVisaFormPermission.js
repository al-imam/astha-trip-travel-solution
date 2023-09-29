const DB_permission = require("../../model/Agent_acsses");

const ChangePermission = async (req, res) => {
  try {
    const { status, id } = req.body;
    const resdb = await DB_permission.findByIdAndUpdate(id, {
      visa_form: status,
    });
    res.status(200).send("done");
  } catch (error) {
    console.log(
      "🚀 ~ file: UpdateVisaFormPermission.js:5 ~ ChangePermission ~ error:",
      error
    );
    res.status(500).send(error);
  }
};

module.exports = ChangePermission;
