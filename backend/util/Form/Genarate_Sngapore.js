const SINGAPORE_DATABASE = require("../../model/Singapore");
const LOI_DATABASE = require("../../model/LOI");
const { PDFDocument } = require("pdf-lib");
const { readFile, writeFile } = require("fs/promises");
const FormHelper = require("./Helper/Function");
const path = require("path");

const Generate_Singapore = async (id) => {
  try {
    // check is query id is provided
    if (!id) {
      throw "id not found";
    }
    //get the form data from the database => by ID;
    const [response] = await SINGAPORE_DATABASE.findById(id);

    // // check is data is exist on the database
    // if (!response) {
    //   throw "Provided ID has no relevant data";
    // }
    // // check the data is approved with the loi request
    // if (response.status !== "approved") {
    //   const [responseLOI] = await LOI_DATABASE.find({ visa_application: id });
    //   if (!responseLOI) {
    //     throw "This request are not approved by the Admin";
    //   }
    //   if (responseLOI.status !== "approved") {
    //     throw "This LOI are not approved by the Admin";
    //   }
    // }

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
      return `${number}`;
    };

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
        value: PreFix(new Date(response["date_of_birth"]).getMonth()),
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
    ]);

    form.flatten();
    const pdfByt = await pdfDoc.save();
    await writeFile("./Singapore-gen test.pdf", pdfByt);
    return "pdf save ";
  } catch (error) {
    console.log("🚀 ~ file: Genarate_Sngapore.js:9 ~ error:", error);
  }
};

module.exports = Generate_Singapore;
