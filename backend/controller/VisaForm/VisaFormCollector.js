const Schengen = require("../../model/Schengen");
const Singapore = require("../../model/Singapore");
const Thailand = require("../../model/Thailand");

const VisaFormColector = () => {
  return {
    schengen: async (req, res, next) => {
      let apply = {};
      if (req.User.Admin) {
        apply = {
          type: "Admin",
          email: req.User.Admin.email,
        };
      } else {
        apply = {
          type: "Agent",
          email: req.User.Agent.email,
        };
      }

      try {
        const { body } = req;

        const resDb = await Schengen.Add({
          surname: body["surname"],
          first_name: body["first-name"],
          date_of_birth: body["date-of-birth"],
          place_of_birth: body["place-of-birth"],
          country_of_birth: body["country-of-birth"],
          current_nationality: body["current-nationality"],
          nationality_at_birth: body["nationality-at-birth"],
          other_nationalities: JSON.stringify(body["other-nationalities"]),
          sex: body["sex"],
          civil_status: body["civil-status"],
          parental_authority: body["parental-authority"],
          national_identity_number: body["national-identity-number"],
          type_of_travel_document: body["travel-document-type"],
          passport_number: body["passport-number"],
          passport_issue_date: body["date-of-issue"],
          passport_expire_date: body["valid-until"],
          passport_issued_country: body["issued-country"],
          uk_family_surname: body["citizen-surname"],
          uk_family_first_name: body["citizen-first-name"],
          uk_family_date_of_birth: body["citizen-date-of-birth"],
          uk_family_nationality: body["citizen-nationality"],
          uk_family_passport_or_id: body["citizen-travel-document-number"],
          uk_family_relationship: body["citizen-relationship"],
          home_email: body["email-address"],
          home_address: body["home-address"],
          phone: body["telephone-no"],
          residence_in_a_country_equivalent:
            body["resident-permit-or-equivalent"],
          residence_in_a_country_no: body["resident-no"],
          residence_in_a_country_valid: body["resident-valid-until"],
          current_occupation: body["current-occupation"],
          employer_and_employers_address:
            body["employers-address-telephone-number"],
          purpose_of_the_journey: body["purpose-of-journey"],
          additional_info_purpose: body["purpose-of-journey-additional"],
          member_state_of_main_destination: body["main-destination"],
          member_state_of_first_entry: body["first-entry"],
          number_of_entries_requested: body["number-of-entries-requested"],
          fingerprint_collection: JSON.stringify({
            date: body["previously-collected-fingerprints-date"],
            sticker_number: body["previously-collected-fingerprints-visa-no"],
          }),
          entry_permit_for_the_final_country: JSON.stringify({
            issued: body["destination-issue-by"],
            valid: body["destination-valid-from"],
            until: body["destination-valid-to"],
          }),
          address_of_inviting_person_or_hotel:
            body["surname-and-first-name-of-inviting-persons"],
          phone_of_inviting_person_or_hotel:
            body["telephone-no-of-inviting-persons"],
          address_of_inviting_company_org:
            body["name-address-of-inviting-company"],
          phone_of_inviting_company_org:
            body["telephone-no-of-inviting-company"],
          contact_person_of_inviting_company:
            body["surname-and-first-name-of-contact-persons"],
          cost_of_travel_and_living: JSON.stringify(
            body["cost-of-traveling-and-living"]
          ),
          apply_by: JSON.stringify(apply),
          status: "pending",
        });

        if (typeof resDb.errno === "number" || resDb.errno) {
          return res.status(406).json({ message: "Something went wrong" });
        }

        res.json({ success: true });
      } catch (error) {
        console.log("🚀 visa-form-controller - ", error);
        next(error);
      }
    },
    singapore: async (req, res) => {
      let apply = {};
      if (req.User.Admin) {
        apply = {
          type: "Admin",
          email: req.User.Admin.email,
        };
      } else {
        apply = {
          type: "Agent",
          email: req.User.Agent.email,
        };
      }

      try {
        const { body } = req;
        const DbRes = await Singapore.Add({
          name: body["name"],
          alias: body["alias"],
          date_of_birth: body["date-of-birth"],
          sex: body["sex"],
          marital_status: body["marital-status"],
          nationality: body["nationality"],
          country_place_of_birth: body["country-of-birth"],
          state_place_of_birth: body["state-of-birth"],
          race: body["race"],
          citizenship: body["citizenship-of-spouse"],
          nric: body["nric-no"],
          type_of_passport: body["type-of-passport"],
          passport_number: body["passport-no"],
          passport_issue_date: body["passport-issue-date"],
          passport_expire_date: body["passport-expiry-date"],
          passport_issue_country: body["country-of-issue"],
          prc_id_number: body["prc-id-number"],
          residence_country: body["residence"],
          residence_state: body["state-of-residence"],
          residence_origin: body["prefecture-of-residence"],
          residence_district: body["state-of-residence"],
          residence_address: body["address"],
          email: body["email-address"],
          contact_number: body["contact-number"],
          occupation: body["occupation"],
          high_academic: body["highest-academic"],
          qualifications_attained: body["qualifications-attained"],
          annual_income: body["annual-income"],
          religion: body["religion"],
          expected_date_of_arrival: body["arrival-date"],
          type_of_visa: body["type-of-visa"],
          purpose_of_visit: body["purpose-of-visit"],
          details_of_purpose: body["details-of-purpose"],
          // Address in singapore
          stay_in_duration_singapore: body["days-intend-to-stay"],
          stay_in_singapore: body["reason-for-stay"],
          where_stay: body["stay-location"],
          block: body["singapore-house-no"],
          floor: body["singapore-floor-no"],
          unit_number: body["singapore-unit-no"],
          postal_code: body["singapore-postal-code"],
          street_name: body["singapore-street-name"],
          singapore_contact_number: body["singapore-contact-no"],
          building_name: body["singapore-building-name"],
          did_you_reside_in_other_countries: JSON.stringify(
            body["lived-other-countries"]
          ),
          relationship_of_travel_companion:
            body["relationship-of-travelling-companion"],
          companion_name: body["name-of-travelling-companion"],
          companion_date_of_birth: body["birth-date-of-travelling-companion"],
          companion_sex: body["sex-of-travelling-companion"],
          companion_nationality: body["nationality-of-travelling-companion"],
          companion_passport_number:
            body["passport-no-of-travelling-companion"],
          // local contact
          local_contact_name: body["name-of-local-contact"],
          local_contact_relation: body["relationship-of-local-contact"],
          local_contact_contact_number: body["contact-no-of-local-contact"],
          local_contact_email: body["email-of-local-contact"],
          antecedent_of_applicant: JSON.stringify({
            a: body["a"],
            a: body["b"],
            a: body["c"],
            a: body["d"],
            details: body["details-why-yes"] || "",
          }),

          status: "pending",
          apply_by: JSON.stringify(apply),
        });

        res.send("database Insert done!");
      } catch (error) {
        console.log(
          "🚀 ~ file: VisaFormCollector.js:5 ~ VisaFormColector ~ error:",
          error
        );
        res.status(500).send(error);
      }
    },
    thailand: async (req, res) => {
      let apply = {};
      if (req.User.Admin) {
        apply = {
          type: "Admin",
          email: req.User.Admin.email,
        };
      } else {
        apply = {
          type: "Agent",
          email: req.User.Agent.email,
        };
      }

      try {
        const { body } = req;

        const DbRe = await Thailand.Add({
          type_of_visa: body["type-of-visa-requested"],
          name_title: body["name-title"],
          first_name: body["first-name"],
          middle_name: body["middle-name"],
          family_name: body["last-name"],
          former_name: body["former-name"],
          nationality: body["nationality"],
          nationality_at_birth: body["nationality-at-birth"],
          birth_place: body["place-of-birth"],
          marital_status: body["marital-status"],
          date_of_birth: body["date-of-birth"],
          type_of_passport: body["type-of-passport"],
          passport_number: body["passport-number"],
          passport_issued_at: body["passport-issued-at"],
          passport_issue_date: body["passport-date-of-issue"],
          passport_expiry_date: body["passport-expire-date"],
          occupation: body["occupation"],
          current_address: body["current-address"],
          phone: body["telephone"],
          email: body["email"],
          permanent_address: body["permanent-address"],
          permanent_phone: body["permanent-telephone"],
          minor_children_info:
            body["names-dates-and-places-of-birth-of-minor-children"],
          arrival_date_thailand:
            body["date-of-arrival-in-and-departure-from-thailand"],
          travel_by: body["traveling-by"],
          flight_no: body["flight_no_or_vessel_name"],
          stay_duration: body["duration-of-proposed-stay"],
          date_of_previous_visit: body["date-of-previous-visit"],
          purpose_of_visit: body["purpose-of-visit"],
          country_of_passport_valid:
            body["countries-for-which-travel-document-is-valid"],
          address_in_thailand: body["proposed-address-in-thailand"],
          local_guarantor: body["name-and-address-of-local-guarantor"],
          local_contact_phone: body["telephone-fax-of-local-guarantor"],
          thailand_guarantor: body["name-and-address-of-guarantor-in-thailand"],
          thailand_contact_phone: body["telephone-fax-of-thailand-guarantor"],

          number_of_entry: body["number-of-entries"],
          status: "pending",
          // Address i
          apply_by: JSON.stringify(apply),
        });

        res.send("database Insert done!");
      } catch (error) {
        console.log(
          "🚀 ~ file: VisaFormCollector.js:5 ~ VisaFormColector ~ error:",
          error
        );
        res.status(500).send(error);
      }
    },
  };
};

module.exports = VisaFormColector;
