const Singapore = require("../../model/Singapore");
const Thailand = require("../../model/Thailand");
const Schengen = require("../../model/Schengen");

const commonKeys = {
  name: ["name", "first_name", "first_name & surname"],
  date_of_birth: ["date_of_birth", "date_of_birth", "date_of_birth"],
  place_of_birth: [null, null, "place_of_birth"],
  nationality: ["nationality", "nationality", "current_nationality"],
  type_of_passport: [
    "type_of_passport",
    "type_of_passport",
    "type_of_travel_document",
  ],
  passport_number: ["passport_number", "passport_number", "passport_number"],
  passport_issue_date: [
    "passport_issue_date",
    "passport_issue_date",
    "passport_issue_date",
  ],
  passport_expire_date: [
    "passport_expire_date",
    "passport_expiry_date",
    "passport_expire_date",
  ],
  passport_issued_country: [null, null, "passport_issued_country"],
  email: ["email", "email", "home_email"],
  phone: ["phone", "phone", "phone"],
  occupation: ["occupation", "occupation", "current_occupation"],
  employer_and_employers_address: [
    null,
    null,
    "employer_and_employers_address",
  ],
  purpose_of_visit: [
    "purpose_of_visit",
    "purpose_of_visit",
    "purpose_of_the_journey",
  ],
  marital_status: ["marital_status", "marital_status", "civil_status"],
  arrival_date_thailand: [null, "arrival_date_thailand", null],
  stay_duration: [null, "stay_duration", null],
  date_of_previous_visit: [null, "date_of_previous_visit", null],
  country_of_passport_valid: [null, "country_of_passport_valid", null],
  address_in_thailand: [null, "address_in_thailand", null],
  local_guarantor: [null, "local_guarantor", null],
  local_contact_phone: [null, "local_contact_phone", null],
  thailand_guarantor: [null, "thailand_guarantor", null],
  thailand_contact_phone: [null, "thailand_contact_phone", null],
  type_of_visa: [null, "type_of_visa", null],
  number_of_entry: [null, "number_of_entry", null],
  name_title: [null, "name_title", null],
  sex: ["sex", "sex", "sex"],
};

function combineData(objects) {
  const combinedData = {};
  for (const key in commonKeys) {
    if (commonKeys && key in commonKeys) {
      for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        if (obj && key in obj && obj[key] !== null) {
          combinedData[key] = obj[key];
          break;
        }
      }
    }
  }

  return combinedData;
}

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
          common: combineData([
            SingaporeDatabase,
            ThailandDatabase,
            SchengenDatabase,
          ]),
        });
      } catch (error) {
        console.log("🚀 get_by_passport ~ error", error);
      }
    },
  };
};

module.exports = GetFormData;
