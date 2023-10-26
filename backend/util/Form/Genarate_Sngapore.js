const SINGAPORE_DATABASE = require("../../model/Singapore");
const LOI_DATABASE = require("../../model/LOI");
const { PDFDocument } = require("pdf-lib");
const { readFile, writeFile } = require("fs/promises");
const FormHelper = require("./Helper/Function");
const path = require("path");

const baseURL = process.env.FLASK_BASE_URL ?? "http://127.0.0.1:8000";
const axios = require("axios");
const Generate_Singapore = async (id) => {
  try {
    // check is query id is provided
    if (!id) {
      throw "id not found";
    }
    //get the form data from the database => by ID;
    const [response] = await SINGAPORE_DATABASE.findById(id);

    // check is data is exist on the database
    if (!response) {
      throw "Provided ID has no relevant data";
    }
    // check the data is approved with the loi request

    if (response.status !== "approved") {
      console.log("goo");
      const [responseLOI] = await LOI_DATABASE.find({ visa_application: id });
      if (!responseLOI) {
        throw "This request are not approved by the Admin";
      }
      if (responseLOI.status !== "approved") {
        throw "This LOI are not approved by the Admin";
      }
    }
    //  readfile
    const formUrl = await readFile(path.join(__dirname, "./src/Singapore.pdf"));
    const pdfDoc = await PDFDocument.load(formUrl);
    const form = pdfDoc.getForm();
    const allName = form.getFields();

    // const ref = allName.map((e) => {
    //   return {
    //     type: e.constructor.name,
    //     name: e.getName(),
    //   };
    // });
    // await writeFile("./singapore.json", JSON.stringify(ref));

    const names = (str) => {
      let c = 0;
      let s = [];
      let g = 0;
      str
        .split(" ")
        .map((e) => {
          const lenth = e.length;
          return { lenth, data: e };
        })
        .forEach((e) => {
          if (c + e.lenth > 25) {
            g++;
            s[g] === undefined && (s[g] = "");
            s[g] = s[g] + " " + e.data;
            c = e.lenth + 1;
          } else {
            c += e.lenth + 1;
            s[g] === undefined && (s[g] = "");
            s[g] = s[g] + " " + e.data;
          }
        });
      return [...s.map((e) => e.trim())];
    };
    const PreFix = (number) => {
      if (`${number}`.length <= 1) {
        return `0${number}`;
      }
      if (number) {
        return `${number}`;
      }
      return false;
    };

    let residenceData = null;

    try {
      const temp = JSON.parse(response["did_you_reside_in_other_countries"]);
      residenceData = temp;
    } catch (error) {}

    let antecedent_of_applicant = null;
    try {
      const temp = JSON.parse(response["antecedent_of_applicant"]);
      antecedent_of_applicant = temp;
    } catch (error) {}

    FormHelper(form).SetBulk([
      {
        type: "PDFTextField",
        name: "undefined",
        value: names(response["name"])[0],
      },
      {
        type: "PDFTextField",
        name: "undefined_2",
        value: names(response["name"])[1],
      },
      {
        type: "PDFTextField",
        name: "undefined_3",
        value: names(response["alias"])[0],
      },
      {
        type: "PDFTextField",
        name: "undefined_4",
        value: names(response["alias"])[2],
      },

      {
        type: "PDFTextField",
        name: "Date of Birth",
        value: PreFix(new Date(response["date_of_birth"]).getDate()),
      },
      {
        type: "PDFTextField",
        name: "M",
        value: PreFix(new Date(response["date_of_birth"]).getMonth() + 1),
      },

      {
        type: "PDFTextField",
        name: "Y",
        value: PreFix(new Date(response["date_of_birth"]).getFullYear()),
      },
      {
        type: "PDFCheckBox",
        name: "undefined_5",
        value: response["sex"] === "Male",
      },
      {
        type: "PDFCheckBox",
        name: "undefined_6",
        value: response["sex"] === "Female",
      },
      {
        type: "PDFCheckBox",
        name: "Single",
        value: response["marital_status"] === "Single",
      },
      {
        type: "PDFCheckBox",
        name: "Married",
        value: response["marital_status"] === "Married",
      },
      {
        type: "PDFCheckBox",
        name: "Separated",
        value: response["marital_status"] === "Separated",
      },
      {
        type: "PDFCheckBox",
        name: "Divorced",
        value: response["marital_status"] === "Divorced",
      },
      {
        type: "PDFCheckBox",
        name: "Widowed",
        value: response["marital_status"] === "Widowed",
      },
      {
        type: "PDFCheckBox",
        name: "Cohabited",
        value: response["marital_status"] === "Cohabited",
      },
      {
        type: "PDFCheckBox",
        name: "Customary",
        value: response["marital_status"] === "Customary",
      },
      {
        type: "PDFCheckBox",
        name: "Singapore Citizen",
        value: response["citizenship"] === "Singapore Citizen",
      },
      {
        type: "PDFCheckBox",
        name: "Singapore Permanent Resident",
        value: response["citizenship"] === "Singapore Permanent Resident",
      },
      {
        type: "PDFCheckBox",
        name: "Others Please Specify",
        value:
          response["citizenship"] !== "Singapore Permanent Resident" &&
          response["citizenship"] !== "Singapore Citizen",
      },
      {
        type: "PDFTextField",
        name: "NRIC No",
        value:
          response["citizenship"] === "Singapore Citizen" && response["nric"],
      },
      {
        type: "PDFTextField",
        name: "NRIC No_2",
        value:
          response["citizenship"] === "Singapore Permanent Resident" &&
          response["nric"],
      },
      {
        type: "PDFTextField",
        name: "undefined_7",
        value:
          response["citizenship"] !== "Singapore Permanent Resident" &&
          response["citizenship"] !== "Singapore Citizen" &&
          response["citizenship"],
      },
      {
        type: "PDFTextField",
        name: "CountryPlace of Birth",
        value: response["country_place_of_birth"],
      },
      {
        type: "PDFTextField",
        name: "StateProvince of Birth",
        value: response["state_place_of_birth"],
      },
      {
        type: "PDFTextField",
        name: "Chinese Caucasian etc",
        value: response["race"],
      },
      {
        type: "PDFTextField",
        name: "NationalityCitizenship",
        value: response["nationality"],
      },
      {
        type: "PDFCheckBox",
        name: "International Passport",
        value: response["type_of_passport"] === "International Passport",
      },
      {
        type: "PDFCheckBox",
        name: "Service Passport",
        value: response["type_of_passport"] === "Service Passport",
      },
      {
        type: "PDFCheckBox",
        name: "Diplomatic Passport",
        value: response["type_of_passport"] === "Diplomatic Passport",
      },
      {
        type: "PDFCheckBox",
        name: "Document of Identity",
        value: response["type_of_passport"] === "Document of Identity",
      },
      {
        type: "PDFCheckBox",
        name: "Official Passport",
        value: response["type_of_passport"] === "Official Passport",
      },
      {
        type: "PDFCheckBox",
        name: "Certificate of Identity",
        value: response["type_of_passport"] === "Certificate of Identity",
      },
      {
        type: "PDFCheckBox",
        name: "Others please specify",
        value:
          response["type_of_passport"] !== "Certificate of Identity" &&
          response["type_of_passport"] !== "Official Passport" &&
          response["type_of_passport"] !== "Document of Identity" &&
          response["type_of_passport"] !== "Diplomatic Passport" &&
          response["type_of_passport"] !== "Service Passport" &&
          response["type_of_passport"] !== "International Passport",
      },
      {
        type: "PDFTextField",
        name: "undefined_8",
        value:
          response["type_of_passport"] !== "Certificate of Identity" &&
          response["type_of_passport"] !== "Official Passport" &&
          response["type_of_passport"] !== "Document of Identity" &&
          response["type_of_passport"] !== "Diplomatic Passport" &&
          response["type_of_passport"] !== "Service Passport" &&
          response["type_of_passport"] !== "International Passport" &&
          response["type_of_passport"],
      },

      {
        type: "PDFTextField",
        name: "Travel Document No",
        value: response["passport_number"],
      },
      {
        type: "PDFTextField",
        name: "Travel Document",
        value: PreFix(new Date(response["passport_issue_date"]).getDate()),
      },
      {
        type: "PDFTextField",
        name: "M M",
        value: PreFix(new Date(response["passport_issue_date"]).getMonth() + 1),
      },
      {
        type: "PDFTextField",
        name: "Y_2",
        value: PreFix(new Date(response["passport_issue_date"]).getFullYear()),
      },
      {
        type: "PDFTextField",
        name: "Expiry Date",
        value: PreFix(new Date(response["passport_expire_date"]).getDate()),
      },
      {
        type: "PDFTextField",
        name: "M M_2",
        value: PreFix(
          new Date(response["passport_expire_date"]).getMonth() + 1
        ),
      },
      {
        type: "PDFTextField",
        name: "Y_3",
        value: PreFix(new Date(response["passport_expire_date"]).getFullYear()),
      },
      {
        type: "PDFTextField",
        name: "CountryPlace of Issue",
        value: response["passport_issue_country"],
      },
      {
        type: "PDFTextField",
        name: "undefined_10",
        value: response["prc_id_number"],
      },

      {
        type: "PDFTextField",
        name: "CountryPlace of Origin",
        value: response["residence_country"],
      },
      {
        type: "PDFTextField",
        name: "DivisionStateProvince",
        value: response["residence_state"],
      },
      {
        type: "PDFTextField",
        name: "Prefecture of Origin",
        value: response["residence_origin"],
      },
      {
        type: "PDFTextField",
        name: "CountyDistrict of Origin",
        value: response["residence_district"],
      },
      {
        type: "PDFTextField",
        name: "Address",
        value: response["residence_address"],
      },
      { type: "PDFTextField", name: "undefined_11", value: response["email"] },
      {
        type: "PDFTextField",
        name: "Contact Number",
        value: response["contact_number"],
      },
      {
        type: "PDFTextField",
        name: "undefined_12",
        value: response["occupation"],
      },

      {
        type: "PDFCheckBox",
        name: "No Formal Education",
        value: response["high_academic"] === "No Formal Education",
      },
      {
        type: "PDFCheckBox",
        name: "Primary",
        value: response["high_academic"] === "Primary",
      },
      {
        type: "PDFCheckBox",
        name: "Secondary",
        value: response["high_academic"] === "Secondary",
      },
      {
        type: "PDFCheckBox",
        name: "PreUniversity",
        value: response["high_academic"] === "Pre-University",
      },
      {
        type: "PDFCheckBox",
        name: "Diploma",
        value: response["high_academic"] === "Diploma",
      },
      {
        type: "PDFCheckBox",
        name: "University",
        value: response["high_academic"] === "University",
      },
      {
        type: "PDFCheckBox",
        name: "PostGraduate",
        value: response["high_academic"] === "Post-Graduate",
      },
      {
        type: "PDFTextField",
        name: "Singapore dollars SGD",
        value: response["annual_income"],
      },
      {
        type: "PDFTextField",
        name: "undefined_13",
        value: response["religion"],
      },

      {
        type: "PDFTextField",
        name: "Expected Date of Arrival in Singapore",
        value: PreFix(new Date(response["expected_date_of_arrival"]).getDate()),
      },
      {
        type: "PDFTextField",
        name: "M M_3",
        value: PreFix(
          new Date(response["expected_date_of_arrival"]).getMonth() + 1
        ),
      },
      {
        type: "PDFTextField",
        name: "Y_4",
        value: PreFix(
          new Date(response["expected_date_of_arrival"]).getFullYear()
        ),
      },

      {
        type: "PDFCheckBox",
        name: "Single Journey",
        value: response["type_of_visa"] === "Single Journey",
      },
      {
        type: "PDFCheckBox",
        name: "Double Journey",
        value: response["type_of_visa"] === "Double Journey",
      },
      {
        type: "PDFCheckBox",
        name: "Triple Journey",
        value: response["type_of_visa"] === "Triple Journey",
      },
      {
        type: "PDFCheckBox",
        name: "Multiple Journey",
        value: response["type_of_visa"] === "Multiple Journey",
      },
      {
        type: "PDFCheckBox",
        name: "Social",
        value: response["purpose_of_visit"] === "Social",
      },
      {
        type: "PDFCheckBox",
        name: "Business",
        value: response["purpose_of_visit"] === "Business",
      },

      {
        type: "PDFTextField",
        name: "undefined_14",
        value: response["details_of_purpose"],
      },

      {
        type: "PDFCheckBox",
        name: "Less than 30 days",
        value: response["stay_in_duration_singapore"] === "More than 30 days'",
      },
      {
        type: "PDFCheckBox",
        name: "More than 30 days",
        value: response["stay_in_duration_singapore"] === "More than 30 days",
      },

      {
        type: "PDFTextField",
        name: "duration 1",
        value: response["stay_in_singapore"].slice(0, 80),
      },
      {
        type: "PDFTextField",
        name: "duration 2",
        value: response["stay_in_singapore"].slice(
          80,
          response["stay_in_singapore"].length
        ),
      },
      {
        type: "PDFCheckBox",
        name: "Next of Kins Place",
        value: response["where_stay"] === "Next of Kin's Place",
      },
      {
        type: "PDFCheckBox",
        name: "Relatives Place",
        value: response["where_stay"] === "Relative's Place",
      },
      {
        type: "PDFCheckBox",
        name: "Friends Place",
        value: response["where_stay"] === "Friend's Place",
      },
      {
        type: "PDFCheckBox",
        name: "Hotel",
        value: response["where_stay"] === "Hotel",
      },
      {
        type: "PDFTextField",
        name: "Others Please specify",
        value:
          response["where_stay"] !== "Hotel" &&
          response["where_stay"] !== "Friend's Place" &&
          response["where_stay"] !== "Relative's Place" &&
          response["where_stay"] !== "Next of Kin's Place" &&
          response["where_stay"],
      },

      { type: "PDFTextField", name: "BlockHouse No", value: response["block"] },
      { type: "PDFTextField", name: "Floor No", value: response["floor"] },
      { type: "PDFTextField", name: "Unit No", value: response["unit_number"] },
      {
        type: "PDFTextField",
        name: "Postal Code",
        value: response["postal_code"],
      },
      {
        type: "PDFTextField",
        name: "Street Name",
        value: response["street_name"],
      },
      {
        type: "PDFTextField",
        name: "Contact No",
        value: response["singapore_contact_number"],
      },
      {
        type: "PDFTextField",
        name: "Building Name",
        value: response["building_name"],
      },
      {
        type: "PDFCheckBox",
        name: "undefined_15",
        value:
          response["where_stay"] !== "Hotel" &&
          response["where_stay"] !== "Friend's Place" &&
          response["where_stay"] !== "Relative's Place" &&
          response["where_stay"] !== "Next of Kin's Place",
      },
      {
        type: "PDFRadioGroup",
        name: "Did you reside in other countriesplaces other than your countryplace of origin for one year or more during the last 5 years",
        value: residenceData && residenceData.length ? "Yes" : "No",
      },
      {
        type: "PDFTextField",
        name: "CountryPlaceRow1",
        value: residenceData
          .map((e) => {
            return e.country;
          })
          .join("\n"),
      },
      {
        type: "PDFTextField",
        name: "AddressRow1",
        value: residenceData
          .map((e) => {
            return e.address;
          })
          .join("\n"),
      },

      {
        type: "PDFTextField",
        name: "FromRow1",
        value: residenceData
          .map((e) => {
            return e.from.split("-").reverse().join("-");
          })
          .join("\n"),
      },
      {
        type: "PDFTextField",
        name: "ToRow1",
        value: residenceData
          .map((e) => {
            return e.to.split("-").reverse().join("-");
          })
          .join("\n"),
      },

      {
        type: "PDFTextField",
        name: "undefined_16",
        value: response["relationship_of_travel_companion"],
      },
      {
        type: "PDFTextField",
        name: "undefined_17",
        value: names(response["companion_name"])[0],
      },
      {
        type: "PDFTextField",
        name: "undefined_18",
        value: names(response["companion_name"])[1],
      },

      {
        type: "PDFTextField",
        name: "D",
        value:
          PreFix(new Date(response["companion_date_of_birth"]).getDate()) ||
          " ",
      },
      {
        type: "PDFTextField",
        name: "M_2",
        value:
          PreFix(
            new Date(response["companion_date_of_birth"]).getMonth() + 1
          ) || " ",
      },
      {
        type: "PDFTextField",
        name: "Y_5",
        value:
          PreFix(new Date(response["companion_date_of_birth"]).getFullYear()) ||
          " ",
      },
      // { type: "PDFTextField", name: "D_2", value: 12 },

      {
        type: "PDFCheckBox",
        name: "Male",
        value: response["companion_sex"] === "Male",
      },
      // fe male
      {
        type: "PDFCheckBox",
        name: "Check Box2",
        value: response["companion_sex"] === "Female",
      },

      {
        type: "PDFTextField",
        name: "D_2",
        value: response["companion_nationality"],
      },

      {
        type: "PDFTextField",
        name: "Travel Document_2",
        value: response["companion_passport_number"],
      },

      {
        type: "PDFTextField",
        name: "Name of Local Contact",
        value: names(response["local_contact_name"])[0],
      },
      {
        type: "PDFTextField",
        name: "CompanyHotel",
        value: names(response["local_contact_name"])[1],
      },
      {
        type: "PDFTextField",
        name: "Local ContactCompany",
        value: response["local_contact_relation"],
      },

      {
        type: "PDFTextField",
        name: "Contact No_2",
        value: response["local_contact_contact_number"],
      },

      {
        type: "PDFTextField",
        name: "Email Address",
        value: response["local_contact_email"],
      },

      {
        type: "PDFCheckBox",
        name: "Check Box3",
        value: antecedent_of_applicant
          ? antecedent_of_applicant?.a !== "No"
            ? true
            : false
          : false,
      },
      {
        type: "PDFCheckBox",
        name: "Check Box4",
        value: antecedent_of_applicant
          ? antecedent_of_applicant?.b !== "No"
            ? true
            : false
          : false,
      },
      {
        type: "PDFCheckBox",
        name: "Check Box5",
        value: antecedent_of_applicant
          ? antecedent_of_applicant?.c !== "No"
            ? true
            : false
          : false,
      },
      {
        type: "PDFCheckBox",
        name: "Check Box6",
        value: antecedent_of_applicant
          ? antecedent_of_applicant?.d !== "No"
            ? true
            : false
          : false,
      },
      {
        type: "PDFCheckBox",
        name: "Check Box7",
        value: antecedent_of_applicant
          ? antecedent_of_applicant?.a !== "Yes"
            ? true
            : false
          : false,
      },
      {
        type: "PDFCheckBox",
        name: "Check Box8",
        value: antecedent_of_applicant
          ? antecedent_of_applicant?.b !== "Yes"
            ? true
            : false
          : false,
      },
      {
        type: "PDFCheckBox",
        name: "Check Box9",
        value: antecedent_of_applicant
          ? antecedent_of_applicant?.c !== "Yes"
            ? true
            : false
          : false,
      },
      {
        type: "PDFCheckBox",
        name: "Check Box10",
        value: antecedent_of_applicant
          ? antecedent_of_applicant?.d !== "Yes"
            ? true
            : false
          : false,
      },

      {
        type: "PDFTextField",
        name: "If any of the answer is YES please furnish details below 1",
        value: antecedent_of_applicant
          ? antecedent_of_applicant.details.slice(0, 80)
          : "",
      },
      {
        type: "PDFTextField",
        name: "If any of the answer is YES please furnish details below 2",
        value: antecedent_of_applicant
          ? antecedent_of_applicant.details.slice(80, 160)
          : "",
      },

      {
        type: "PDFTextField",
        name: "undefined_20",
        value: antecedent_of_applicant
          ? antecedent_of_applicant.details.slice(
              160,
              antecedent_of_applicant.details.length
            )
          : "",
      },
      {
        type: "PDFTextField",
        name: "Date",
        value: new Date().toLocaleDateString({}, { dateStyle: "medium" }),
      },
    ]);

    form.flatten();
    const pdfByt = await pdfDoc.save();
    // await writeFile("./Singapore-gen test.pdf", pdfByt);
    // return "pdf save ";

    // const /generate/undertaking/single/

    const undertaking = await axios.post(
      `${baseURL}/generate/undertaking/single/`,
      {
        name: response["name"],
      }
    );

    return {
      file: pdfByt,
      name: response["name"],
      undertaking: undertaking.data,
    };
  } catch (error) {
    console.log("🚀 ~ file: Genarate_Sngapore.js:9 ~ error:", error);
    throw new Error(error);
  }
};

module.exports = Generate_Singapore;
