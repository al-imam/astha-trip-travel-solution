const Singapore = require("../../model/Singapore");
const Thailand = require("../../model/Thailand");
const Schengen = require("../../model/Schengen");

const GetFormData = () => {
  return {
    Singapore: async (req, res) => {
      try {
        const [getServer] = await Singapore.findAll();
        res.send(getServer);
      } catch (error) {
        console.log("🚀 ~ file: GetForm.js:7 ~ Singapore: ~ error:", error);
        res.status(500).send("something is wrong ");
      }
    },
    Thailand: async (req, res) => {
      try {
        const [serverRes] = await Thailand.findAll();
        res.send(serverRes);
      } catch (error) {
        console.log("🚀 ~ file: GetForm.js:19 ~ Thailand: ~ error:", error);
        res.status(500).send("something is wrong ");
      }
    },
    Schengen: async (req, res) => {
      try {
        const [getServer] = await Schengen.findAll();
        res.send(getServer);
      } catch (error) {
        console.log("🚀 ~ file: GetForm.js:32 ~ Schengen: ~ error:", error);
        res.status(500).send("something is wrong ");
      }
    },
    agent: async (req, res) => {
      const Agent = req.AGENT;
      const query = JSON.stringify({
        type: "Agent",
        email: Agent.email,
      });
      try {
        const SingaporeData = await Singapore.find({ apply_by: query });
        const ThailandData = await Thailand.find({ apply_by: query });
        const SchengenData = await Schengen.find({ apply_by: query });

        res.status(200).json({
          Singapore: SingaporeData,
          Thailand: ThailandData,
          Schengen: SchengenData,
        });
      } catch (error) {
        console.log("🚀 ~ file: GetForm.js:41 ~ agent: ~ error:", error);
        res.status(500).send({
          error,
          hint: `⛔ Eroor in GetForm.js > path = backend>controller>VisaForm>GetForm.js : line= 55 `,
        });
      }
    },
    get_by_passport: async (req, res) => {
      try {
        const passport = req.params.passport;

        const [SingaporeDatabase] = await Singapore.find({
          passport_number: passport,
        });

        const [ThailandDatabase] = await Thailand.find({
          passport_number: passport,
        });

        const [SchengenDatabase] = await Schengen.find({
          passport_number: passport,
        });

        if (SchengenDatabase && SchengenDatabase["other_nationalities"]) {
          SchengenDatabase["other_nationalities"] = JSON.parse(
            SchengenDatabase["other_nationalities"]
          );
        }

        res.status(200).json({
          singapore: SingaporeDatabase,
          thailand: ThailandDatabase,
          schengen: SchengenDatabase,
        });
      } catch (error) {
        console.log("🚀 get_by_passport ~ error", error);
      }
    },
  };
};

module.exports = GetFormData;
