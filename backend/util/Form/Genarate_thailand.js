const THAILAND_DATABASE = require("../../model/Thailand");
const LOI_DATABASE = require("../../model/LOI");
const { PDFDocument, StandardFonts } = require("pdf-lib");
const { readFile, writeFile } = require("fs/promises");
const FormHelper = require("./Helper/Function");
const path = require("path");
const { v4: uuid } = require("uuid");

// if you're going to change it change it in frontend too
const SEPARATOR = "<$72$31$33$>";

const Generate_thailand = async (id, pass) => {
  try {
    if (!id) throw "id not found";
    const [response] = await THAILAND_DATABASE.findById(id);
    if (!response) throw "Provided ID has no relevant data";

    if (!pass) {
      if (response.status !== "approved") {
        const [responseLOI] = await LOI_DATABASE.find({ visa_application: id });
        if (
          !responseLOI ||
          (responseLOI && responseLOI.status !== "approved")
        ) {
          throw "This request are not approved by the Admin";
        }
        throw "This Request is Not approved";
      }
    }

    const formUrl = await readFile(path.join(__dirname, "src/thailand.pdf"));
    const pdfDoc = await PDFDocument.load(formUrl);
    const form = pdfDoc.getForm();

    function preFix(strNum) {
      const num = parseInt(strNum);
      if (isNaN(num) || strNum.toString().length > 1) return strNum;
      return `0${num}`;
    }

    function compare(to, ...args) {
      return args.some(
        (a) => a?.toString().toLowerCase() === to?.toString().toLowerCase()
      );
    }

    const [occupationPosition, occupationName] =
      response["occupation"]?.split(SEPARATOR) || [];
    FormHelper(form).SetBulk([
      {
        type: "PDFCheckBox",
        name: "Diplomatic Visa",
        value: compare("Diplomatic Visa", response["type_of_visa"]),
      },
      {
        type: "PDFCheckBox",
        name: "Official Visa",
        value: compare("Official Visa", response["type_of_visa"]),
      },
      {
        type: "PDFCheckBox",
        name: "Courtesy Visa",
        value: compare("Courtesy Visa", response["type_of_visa"]),
      },
      {
        type: "PDFCheckBox",
        name: "NonImmigration Visa",
        value: compare("Non-Immigrant Visa", response["type_of_visa"]),
      },
      {
        type: "PDFCheckBox",
        name: "Tourist Visa",
        value: compare("Tourist Visa", response["type_of_visa"]),
      },
      {
        type: "PDFCheckBox",
        name: "Transit Visa",
        value: compare("Transit Visa", response["type_of_visa"]),
      },
      {
        type: "PDFTextField",
        name: "Number of Entries Requested",
        value: preFix(response["number_of_entry"]),
        font: 9,
      },

      {
        type: "PDFTextField",
        name: "Occupation specify present position and name of employer 1",
        value: occupationPosition,
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Occupation specify present position and name of employer 2",
        value: occupationName,
        font: 11,
      },
      {
        type: "PDFRadioGroup",
        name: "salutation",
        value: response["name_title"],
      },
      {
        type: "PDFTextField",
        name: "First Name",
        value: response["first_name"],
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Middle Name (if any)",
        value: response["middle_name"],
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Family Name",
        value: response["family_name"],
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Former Name",
        value: response["former_name"],
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Nationality",
        value: response["nationality"],
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Nationality at Birth",
        value: response["nationality_at_birth"],
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Birth Place",
        value: response["birth_place"],
        font: 9,
      },
      {
        type: "PDFTextField",
        name: "Marital Status",
        value: response["marital_status"],
        font: 9,
      },
      {
        type: "PDFTextField",
        name: "Date of Birth",
        value: response["date_of_birth"]?.split("-").reverse().join("/"),
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "PASSPORT TYPE",
        value: response["type_of_passport"],
        font: 8,
      },
      {
        type: "PDFTextField",
        name: "Passport No",
        value: response["passport_number"],
        font: 9,
      },
      {
        type: "PDFTextField",
        name: "Issued at",
        value: response["passport_issued_at"],
        font: 9,
      },

      {
        type: "PDFTextField",
        name: "Date of Issue",
        value: response["passport_issue_date"]?.split("-").reverse().join("/"),
        font: 9,
      },
      {
        type: "PDFTextField",
        name: "Expiry Date",
        value: response["passport_expiry_date"]?.split("-").reverse().join("/"),
        font: 9,
      },
      {
        type: "PDFTextField",
        name: "Current Address 1",
        value: response["current_address"]?.split(" ").slice(0, 2).join(" "),
        font: 10,
      },
      {
        type: "PDFTextField",
        name: "Current Address 2",
        value:
          response["current_address"]
            ?.split(" ")
            .slice(2, Infinity)
            .join(" ") || " ",
        font: 10,
      },

      {
        type: "PDFTextField",
        name: "Tel",
        value: response["phone"],
        font: 10,
      },
      {
        type: "PDFTextField",
        name: "Email",
        value: response["email"],
        font: 7,
      },
      {
        type: "PDFTextField",
        name: "Permanent Address if different from above 1",
        value: AsAbove(
          response["permanent_address"]?.split(" ").slice(0, 1).join(" ")
        ),
        font: 7,
      },
      {
        type: "PDFTextField",
        name: "Permanent Address if different from above 2",
        value: AsAbove(
          response["permanent_address"]
            ?.split(" ")
            .slice(1, Infinity)
            .join(" "),
          response["permanent_address"]?.split(" ").length
        ),
        font: 7,
      },

      {
        type: "PDFTextField",
        name: "Tel_2",
        value: response["permanent_phone"],
        font: 9,
      },

      {
        type: "PDFTextField",
        name: "if accompanying 1",
        value: NA(
          response["minor_children_info"]?.split(" ").slice(0, 2).join(" ")
        ),
        font: 8,
      },
      {
        type: "PDFTextField",
        name: "if accompanying 2",
        value: NA(
          response["minor_children_info"]
            ?.split(" ")
            .slice(2, Infinity)
            .join(" "),
          response["minor_children_info"]?.split(" ").length
        ),
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Date of Arrival in Thailand",
        value: response["arrival_date_thailand"]
          ?.split("-")
          .reverse()
          .join("/"),
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Traveling by",
        value: response["travel_by"],
        font: 9,
      },

      {
        type: "PDFTextField",
        name: "Flight No or Vessel Name",
        value: response["flight_no"],
        font: 11,
      },

      {
        type: "PDFTextField",
        name: "Duration of Proposed Stay",
        value: response["stay_duration"],
        font: 11,
      },

      {
        type: "PDFTextField",
        name: "Date of Previous Visit to Thailand",
        value: NA(
          response["arrival_date_thailand"]?.split("-").reverse().join("/")
        ),
        font: 11,
      },
      ...purposeOfVisit(
        response["purpose_of_visit"],
        ["undefined_2", "Other please specify"],
        "Tourism",
        "Transit",
        "Business",
        "Diplomatic Official"
      ),
      {
        type: "PDFTextField",
        name: "Countries for which travel document is valid",
        font: 10,
        value: response["country_of_passport_valid"],
      },
      {
        type: "PDFTextField",
        name: "Proposed Address in Thailand",
        value: response["address_in_thailand"]
          ?.split(" ")
          .slice(0, 3)
          .join(" "),
        font: 6,
      },

      {
        type: "PDFTextField",
        name: "Proposed Address in Thailand 2",
        value:
          response["address_in_thailand"]
            ?.split(" ")
            .slice(3, Infinity)
            .join(" ") || " ",
        font: 6,
      },
      {
        type: "PDFTextField",
        name: "Name and Address of Local Guarantor 1",
        value: NA(
          response["local_guarantor"]?.split(" ").slice(0, 3).join(" ")
        ),
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Name and Address of Local Guarantor 2",
        value: NA(
          response["local_guarantor"]?.split(" ").slice(3, Infinity).join(" "),
          response["local_guarantor"]?.split(" ").length
        ),
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "TelFax",
        value: response["local_contact_phone"],
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "TelFax_2",
        value: response["thailand_contact_phone"],
        font: 11,
      },

      {
        type: "PDFTextField",
        name: "Name and Address of Guarantor in Thailand 1",
        value: NA(" ", response["thailand_guarantor"]?.split(" ").length),
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Name and Address of Guarantor in Thailand",
        value: NA(
          response["thailand_guarantor"]?.split(" ").slice(0, 4).join(" "),
          response["thailand_guarantor"]?.split(" ").length
        ),
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Name and Address of Guarantor in Thailand 3",
        value: NA(
          response["thailand_guarantor"]
            ?.split(" ")
            .slice(4, Infinity)
            .join(" "),
          response["thailand_guarantor"].split(" ").length
        ),
        font: 11,
      },
      {
        type: "PDFTextField",
        name: "Date",
        value: new Date().toLocaleDateString({}, { dateStyle: "medium" }),
      },
    ]);

    function AsAbove(value, len = 0) {
      return value ? value : len > 0 ? " " : "SAME AS ABOVE";
    }

    function NA(value, len = 0) {
      return value ? value : len > 0 ? " " : "N/A";
    }

    function purposeOfVisit(value, common, ...args) {
      const options = args.map((name) => ({
        name,
        type: "PDFCheckBox",
        value: compare(name, value),
      }));

      if (options.every((v) => v.value === false)) {
        options.push(
          {
            type: "PDFCheckBox",
            name: common[0],
            value: true,
          },
          {
            type: "PDFTextField",
            name: common[1],
            value,
          }
        );
      }

      return options;
    }

    const courierFont = await pdfDoc.embedFont(StandardFonts.Courier);
    form.updateFieldAppearances(courierFont);

    form.flatten();
    const pdfByt = await pdfDoc.save();

    return {
      file: pdfByt,
      name: `thailand-${response["first_name"]}-${uuid()}`,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = Generate_thailand;
