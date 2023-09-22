const SCHENGEN_DATABASE = require("../../model/Schengen");
const { PDFDocument } = require("pdf-lib");
const { readFile, writeFile } = require("fs/promises");
const FormHelper = require("./Helper/Function");
const path = require("path");

const GenerateSchengen = async (id) => {
  try {
    // check is query id is provided
    if (!id) {
      throw "id not found";
    }
    //get the form data from the database => by ID;
    const [response] = await SCHENGEN_DATABASE.findById(id);

    // check is data is exist on the database
    if (!response) {
      throw "Provided ID has no relevant data";
    }

    const formUrl = await readFile(
      path.join(__dirname, "./src/schengen-visa.pdf")
    );
    const pdfDoc = await PDFDocument.load(formUrl);

    const page = pdfDoc.getPages()[1];
    const { width, height } = page.getSize();
    const fontSize = 7; // Set the font size
    const textX = 300; // X-coordinate of the text position
    const textY = height - 141; // Y-coordinate of the text position
    page.drawText(response["date_of_arrival"], {
      x: textX - 10,
      y: textY,
      size: fontSize,
      //   color: rgb(0, 0, 0), // Black color
    });
    page.drawText(response["date_of_departure"], {
      x: textX + 20,
      y: textY - 13.5,
      size: fontSize,
      //   color: rgb(0, 0, 0), // Black color
    });

    const form = pdfDoc.getForm();
    const allName = form.getFields();
    // const ref = allName.map((e) => {
    //   return {
    //     type: e.constructor.name,
    //     name: e.getName(),
    //   };
    // });

    // await writeFile("./ref.json", JSON.stringify(ref));
    // FormHelper(form).SetText("1 Surname (Family name)", response.surname);

    // FormHelper(form).SetText(
    //   "3 First name(s) (Given name(s))",
    //   response["first_name"]
    // );

    // FormHelper(form).SetText(
    //   "4 Date of birth (day-month-year)",
    //   response["date_of_birth"].split("-").reverse().join("-")
    // );

    // FormHelper(form).SetText("5 Place of birth", response["place_of_birth"]);

    FormHelper(form).SetBulk([
      {
        type: "PDFTextField",
        name: "1 Surname (Family name)",
        value: response["surname"],
      },
      {
        type: "PDFTextField",
        name: "2 Surname at birth (Former family name(s))",
        value: "  ",
      },

      {
        type: "PDFTextField",
        name: "3 First name(s) (Given name(s))",
        value: response["first_name"],
      },
      {
        type: "PDFTextField",
        name: "4 Date of birth (day-month-year)",
        value: response["date_of_birth"].split("-").reverse().join("-"),
      },
      {
        type: "PDFTextField",
        name: "5 Place of birth",
        value: response["place_of_birth"],
        font: 8,
      },
      {
        type: "PDFTextField",
        name: "6 Country of birth",
        value: response["country_of_birth"],
        font: 8,
      },
      {
        type: "PDFTextField",
        name: "7 Current nationality",
        value: response["current_nationality"],
        font: 8,
      },
      ,
      {
        type: "PDFTextField",
        name: "Nationality at birth, if different",
        value: response["nationality_at_birth"] || "N/A",
        font: 8,
      },
      {
        type: "PDFTextField",
        name: "Other nationalities",
        value:
          response["other_nationalities"] &&
          JSON.parse(response["other_nationalities"]).join(","),
        font: 8,
      },
      { type: "PDFCheckBox", name: "Male", value: response["sex"] === "Male" },
      {
        type: "PDFCheckBox",
        name: "Female",
        value: response["sex"] === "Female",
      },
      {
        type: "PDFCheckBox",
        name: "Single",
        value: response["civil_status"] === "Single",
      },
      {
        type: "PDFCheckBox",
        name: "Married",
        value: response["civil_status"] === "Married",
      },
      {
        type: "PDFCheckBox",
        name: "Separated",
        value: response["civil_status"] === "Separated",
      },

      {
        type: "PDFCheckBox",
        name: "Divorced",
        value: response["civil_status"] === "Divorced",
      },
      {
        type: "PDFCheckBox",
        name: "Widow(er)",
        value: response["civil_status"] === "Widow(er)",
      },
      {
        type: "PDFCheckBox",
        name: "Registered Partnership",
        value: response["civil_status"] === "Registered Partnership",
      },

      {
        type: "PDFTextField",
        name: "Other civil status (please specify)",
        value:
          response["civil_status"] !== "Registered Partnership" &&
          response["civil_status"] !== "Widow(er)" &&
          response["civil_status"] !== "Divorced" &&
          response["civil_status"] !== "Separated" &&
          response["civil_status"] !== "Married" &&
          response["civil_status"] !== "Single"
            ? response["civil_status"]
            : "",
      },
      {
        type: "PDFTextField",
        name: "10 Parental authority (in case of minors) /legal guardian (surname, first name, address, if different from applicant’s, telephone no., e-mail address, and nationality)",
        value: response["parental_authority"],
        font: 6,
      },
      {
        type: "PDFTextField",
        name: "11 National identity number, where applicable",
        value: response["national_identity_number"],
      },

      {
        type: "PDFCheckBox",
        name: "Ordinary passport",
        value: response["type_of_travel_document"] === "Ordinary passport",
      },
      {
        type: "PDFCheckBox",
        name: "Diplomatic passport",
        value: response["type_of_travel_document"] === "Diplomatic passport",
      },
      {
        type: "PDFCheckBox",
        name: "Service passport",
        value: response["type_of_travel_document"] === "Service passport",
      },
      {
        type: "PDFCheckBox",
        name: "Official passport",
        value: response["type_of_travel_document"] === "Official passport",
      },
      {
        type: "PDFCheckBox",
        name: "Special passport",
        value: response["type_of_travel_document"] === "Special passport",
      },
      {
        type: "PDFCheckBox",
        name: "Other travel document please specify",
        value:
          response["type_of_travel_document"] !== "Special passport" &&
          response["type_of_travel_document"] !== "Official passport" &&
          response["type_of_travel_document"] !== "Service passport" &&
          response["type_of_travel_document"] !== "Service passport" &&
          response["type_of_travel_document"] !== "Diplomatic passport" &&
          response["type_of_travel_document"] !== "Ordinary passport",
      },

      {
        type: "PDFTextField",
        name: "13 Number of travel document",
        value: response["passport_number"],
      },
      {
        type: "PDFTextField",
        name: "14 Date of issue",
        value: response["passport_issue_date"].split("-").reverse().join("-"),
      },
      {
        type: "PDFTextField",
        name: "15 Valid until",
        value: response["passport_expire_date"].split("-").reverse().join("-"),
      },

      {
        type: "PDFTextField",
        name: "16 Issued by (country)",
        value: response["passport_issued_country"],
      },

      {
        type: "PDFTextField",
        name: "17 Surname (Family name)",
        value: response["uk_family_surname"],
      },

      {
        type: "PDFTextField",
        name: "17 First name(s) (Given name(s))",
        value: response["uk_family_first_name"],
      },

      {
        type: "PDFTextField",
        name: "Date of birth (day month year)",
        value: response["uk_family_date_of_birth"]
          .split("-")
          .reverse()
          .join("-"),
      },
      {
        type: "PDFTextField",
        name: "Nationality",
        value: response["uk_family_nationality"],
      },

      {
        type: "PDFTextField",
        name: "Number of travel document or ID card",
        value: response["uk_family_passport_or_id"],
      },

      {
        type: "PDFCheckBox",
        name: "Spouse",
        value: response["uk_family_relationship"] === "Spouse",
      },
      {
        type: "PDFCheckBox",
        name: "Child",
        value: response["uk_family_relationship"] === "Child",
      },
      {
        type: "PDFCheckBox",
        name: "Grandchild",
        value: response["uk_family_relationship"] === "Grandchild",
      },
      {
        type: "PDFCheckBox",
        name: "Dependent ascendant",
        value: response["uk_family_relationship"] === "Dependent ascendant",
      },
      {
        type: "PDFCheckBox",
        name: "Registered Partnership_2",
        value: response["uk_family_relationship"] === "Registered partnership",
      },
      {
        type: "PDFCheckBox",
        name: "Other_3",
        value:
          response["uk_family_relationship"] !== "Registered partnership" &&
          response["uk_family_relationship"] !== "Dependent ascendant" &&
          response["uk_family_relationship"] !== "Grandchild" &&
          response["uk_family_relationship"] !== "Child" &&
          response["uk_family_relationship"] !== "Spouse",
      },
      {
        type: "PDFTextField",
        name: "19 Applicant's home address and email address",
        value: `Address:${response["home_address"]}; \n EMAIL:${response["home_email"]}`,
        font: 5,
      },

      { type: "PDFTextField", name: "Telephone no", value: response["phone"] },

      {
        type: "PDFCheckBox",
        name: "No",
        value: !response["residence_in_a_country_equivalent"],
      },
      {
        type: "PDFTextField",
        name: "Resident permit or equivalent",
        value: response["residence_in_a_country_equivalent"] || "  ",
        font: 7,
      },

      {
        type: "PDFCheckBox",
        name: "Yes Resident permit or equivalent",
        value: response["residence_in_a_country_equivalent"],
      },

      {
        type: "PDFTextField",
        name: "Number",
        value: response["residence_in_a_country_no"],
        font: 7,
      },
      {
        type: "PDFTextField",
        name: "Resident permit or equivalent valid until",
        value: response["residence_in_a_country_valid"]
          .split("-")
          .reverse()
          .join("-"),
        font: 7,
      },
      {
        type: "PDFTextField",
        name: "21 Current occupation",
        value: response["current_occupation"],
      },
      {
        type: "PDFTextField",
        name: "22 Employer and employer’s address and telephone number. For students, name and address of educational establishment",
        value: response["employer_and_employers_address"],
        font: 6,
      },

      {
        type: "PDFCheckBox",
        name: "Tourism",
        value: response["purpose_of_the_journey"] === "Tourism",
      },
      {
        type: "PDFCheckBox",
        name: "Business",
        value: response["purpose_of_the_journey"] === "Business ",
      },
      {
        type: "PDFCheckBox",
        name: "Visiting family or friends",
        value:
          response["purpose_of_the_journey"] === "Visiting family or friends",
      },
      {
        type: "PDFCheckBox",
        name: "Cultural",
        value: response["purpose_of_the_journey"] === "Cultural",
      },
      {
        type: "PDFCheckBox",
        name: "Sports",
        value: response["purpose_of_the_journey"] === "Sports",
      },
      {
        type: "PDFCheckBox",
        name: "Official visit",
        value: response["purpose_of_the_journey"] === "Official visit",
      },
      {
        type: "PDFCheckBox",
        name: "Medical reasons",
        value: response["purpose_of_the_journey"] === "Medical reasons",
      },
      {
        type: "PDFCheckBox",
        name: "Study",
        value: response["purpose_of_the_journey"] === "Study",
      },
      {
        type: "PDFCheckBox",
        name: "Airport transit",
        value: response["purpose_of_the_journey"] === "Airport transit",
      },
      {
        type: "PDFCheckBox",
        name: "Other please specify_2",
        value:
          response["purpose_of_the_journey"] !== "Tourism" &&
          response["purpose_of_the_journey"] !== "Official visit" &&
          response["purpose_of_the_journey"] !== "Medical reasons" &&
          response["purpose_of_the_journey"] !== "Study" &&
          response["purpose_of_the_journey"] !== "Airport transit ",
      },
      {
        type: "PDFTextField",
        name: "24 Additional information on purpose of stay",
        value: response["additional_info_purpose"],
      },
      {
        type: "PDFTextField",
        name: "25  Member State of main destination (and other Member States of destination, if applicable)",
        value: response["member_state_of_main_destination"],
        font: 6,
      },
      {
        type: "PDFTextField",
        name: "26 Member state of first entry",
        value: response["member_state_of_first_entry"],
      },
      {
        type: "PDFCheckBox",
        name: "Single entry",
        value: response["number_of_entries_requested"] === "Single entry",
      },
      {
        type: "PDFCheckBox",
        name: "Two entries",
        value: response["number_of_entries_requested"] === "Two entries",
      },
      {
        type: "PDFCheckBox",
        name: "Multiple entries",
        value: response["number_of_entries_requested"] === "Multiple entries",
      },
      {
        type: "PDFRadioGroup",
        name: "28 Fingerprints collected previously for the purpose of applying for a Schengen visa",
        value: response["fingerprint_collection"] !== "{}" ? "Yes" : "No_2",
      },
      //   {
      //     type: "PDFTextField",
      //     name: "Intended date of arrival",
      //     value: response["date_of_arrival"],
      //   },
      //   {
      //     type: "PDFTextField",
      //     name: "Intended date of departure",
      //     value: response["date_of_departure"],
      //   },

      {
        type: "PDFTextField",
        name: "Date if known",
        value:
          response["fingerprint_collection"] !== "{}" &&
          JSON.parse(response["fingerprint_collection"])
            .date.split("-")
            .reverse()
            .join("-"),
        font: 7,
      },
      {
        type: "PDFTextField",
        name: "Visa sticker number, if known",
        value:
          response["fingerprint_collection"] !== "{}" &&
          JSON.parse(response["fingerprint_collection"]).sticker_number,
        font: 7,
      },
      {
        type: "PDFTextField",
        name: "29 Issued by",
        value: JSON.parse(response["entry_permit_for_the_final_country"])
          .issued,
      },
      {
        type: "PDFTextField",
        name: "Valid from",
        value: JSON.parse(response["entry_permit_for_the_final_country"]).valid,
      },
      {
        type: "PDFTextField",
        name: "until",
        value: JSON.parse(response["entry_permit_for_the_final_country"]).until,
      },
      {
        type: "PDFTextField",
        name: "*30. Surname and first name of the inviting person(s) in the Member State(s). If not applicable, name of hotel(s) or temporary accommodation(s) in the Member State(s)",
        font: 6,
        value: response["address_of_inviting_person_or_hotel"],
      },
      {
        type: "PDFTextField",
        name: "Address and e-mail address of inviting person(s)/hotel(s) temporary accommodation(s)",
        value: response["address_of_inviting_person_or_hotel"],
        font: 6,
      },

      {
        type: "PDFTextField",
        name: "Telephone no of companyorganisation_3",
        value: response["phone_of_inviting_company_org"],
        font: 7,
      },
      {
        type: "PDFTextField",
        name: "Telephone no_2",
        value: response["phone_of_inviting_person_or_hotel"],
        font: 7,
      },
      {
        type: "PDFTextField",
        name: "*31. Name and address of inviting company/organisation",
        value: response["address_of_inviting_company_org"],
        font: 7,
      },
      {
        type: "PDFTextField",
        name: "*Surname, first name, address, telephone no. and e-mail address of contact person in company/organisation",
        value: response["contact_person_of_inviting_company"],
        font: 7,
      },
    ]);

    form.flatten();
    const pdfByt = await pdfDoc.save();

    await writeFile("./pdfs.pdf", pdfByt);

    return "pdf save ";
  } catch (error) {
    return error;
  }
};

module.exports = GenerateSchengen;
