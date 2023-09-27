const Singapore = require("../../model/Singapore");
const Thailand = require("../../model/Thailand");
const Schengen = require("../../model/Schengen");

const Reject = async (req, res) => {
  try {
    const { id, country } = req.body;
    const update = { status: "rejected" };
    if (country === "singapore") {
      const server_res = await Singapore.findByIdAndUpdate(id, update);
      return res.status(200).send("ok");
    }
    if (country === "schengen") {
      const server_res = await Schengen.findByIdAndUpdate(id, update);
      return res.status(200).send("ok");
    }
    if (country === "thailand") {
      const server_res = await Thailand.findByIdAndUpdate(id, update);
      return res.status(200).send("ok");
    }

    res
      .status(400)
      .send(
        "bad request `⛔ Eroor in Approved.js > path = backend>controller>VisaForm>Approved.js : line= 24 `"
      );
  } catch (error) {
    console.log("🚀 ~ file: Approved.js:5 ~ approved ~ error:", error);
    res.status(500).send({
      error,
      hint: `⛔ Eroor in Approved.js > path = backend>controller>VisaForm>Approved.js : line= 29 `,
    });
  }
};

module.exports = Reject;
