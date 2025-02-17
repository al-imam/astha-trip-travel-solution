const Singapore = require("../../model/Singapore");
const Thailand = require("../../model/Thailand");
const Schengen = require("../../model/Schengen");

const schema = {
  name: ["name", "first_name"],
  first_name: ["name", "first_name"],
  date_of_birth: ["date_of_birth"],
  nationality: ["nationality", "current_nationality"],
  birth_place: ["birth_place", "state_place_of_birth", "place_of_birth"],
  place_of_birth: ["birth_place", "state_place_of_birth", "place_of_birth"],
  state_place_of_birth: [
    "birth_place",
    "state_place_of_birth",
    "place_of_birth",
  ],
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
  phone: ["phone"],
  marital_status: ["marital_status", "civil_status"],
  civil_status: ["marital_status", "civil_status"],
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
        res.status(500).send("something is wrong ");
      }
    },

    Thailand: async (req, res) => {
      try {
        const [serverRes] = await Thailand.findAll();
        res.send(serverRes);
      } catch (error) {
        res.status(500).send("something is wrong ");
      }
    },

    Schengen: async (req, res) => {
      try {
        const [getServer] = await Schengen.findAll();
        res.send(getServer);
      } catch (error) {
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
          schengen,
          common: merge(schema, singapore, thailand, schengen),
        });
      } catch (error) {}
    },
  };
};

module.exports = GetFormData;
