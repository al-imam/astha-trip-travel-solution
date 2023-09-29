const Singapore = require("../../model/Singapore");
const Thailand = require("../../model/Thailand");
const Schengen = require("../../model/Schengen");

const schema = {
  name: ["name", "first_name"],
  date_of_birth: ["date_of_birth"],
  place_of_birth: ["place_of_birth"],
  nationality: ["nationality", "current_nationality"],
  current_nationality: ["nationality", "current_nationality"],
  nationality_at_birth: ["nationality_at_birth"],
  type_of_passport: ["type_of_passport", "type_of_travel_document"],
  type_of_travel_document: ["type_of_passport", "type_of_travel_document"],
  passport_number: ["passport_number"],
  passport_issue_date: ["passport_issue_date"],
  passport_expiry_date: ["passport_expire_date", "passport_expiry_date"],
  passport_expire_date: ["passport_expire_date", "passport_expiry_date"],
  passport_issued_country: ["passport_issued_country"],
  email: ["email", "home_email"],
  home_email: ["email", "home_email"],
  phone: ["phone", "phone", "phone"],
  employer_and_employers_address: ["employer_and_employers_address"],
  purpose_of_visit: ["purpose_of_visit", "purpose_of_the_journey"],
  purpose_of_the_journey: ["purpose_of_visit", "purpose_of_the_journey"],
  marital_status: ["marital_status", "civil_status"],
  civil_status: ["marital_status", "civil_status"],
  arrival_date_thailand: ["arrival_date_thailand"],
  stay_duration: ["stay_duration"],
  date_of_previous_visit: ["date_of_previous_visit"],
  country_of_passport_valid: ["country_of_passport_valid"],
  address_in_thailand: ["address_in_thailand"],
  local_guarantor: ["local_guarantor"],
  local_contact_phone: ["local_contact_phone"],
  thailand_guarantor: ["thailand_guarantor"],
  thailand_contact_phone: ["thailand_contact_phone"],
  type_of_visa: ["type_of_visa"],
  number_of_entry: ["number_of_entry"],
  name_title: ["name_title"],
  sex: ["sex"],
};

function removeEmpty(value) {
  if (!(value instanceof Object)) return undefined;
  const removed = {};
  for (key in value) {
    if (value[key] !== "") removed[key] = value[key];
  }

  return removed;
}

function merge(Schema, ...forms) {
  const mergedObject = {};
  for (const schemaKey in Schema) {
    const schemaArray = Schema[schemaKey];
    if (!Array.isArray(schemaArray)) continue;
    __$: for (const propertyKey of schemaArray) {
      for (const form of forms) {
        if (propertyKey && form instanceof Object && form[propertyKey]) {
          mergedObject[schemaKey] = form[propertyKey];
          break __$;
        }
      }
    }
  }

  return mergedObject;
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
        
        const singapore = removeEmpty(SingaporeDatabase);
        const thailand = removeEmpty(ThailandDatabase);
        const schengen = removeEmpty(SchengenDatabase);

        res.status(200).json({
          singapore,
          thailand,
          thailand,
          common: merge(schema, singapore, thailand, schengen),
        });
      } catch (error) {
        console.log("🚀 get_by_passport ~ error", error);
      }
    },
  };
};

module.exports = GetFormData;
