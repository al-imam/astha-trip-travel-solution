const Schema = require("../database/schema");
const Model = require("../database/Model");

const SchengenSchema = new Schema({
  surname: {
    type: "VARCHAR(255)",
    req: true,
  },
  surname_at_birth: {
    type: "VARCHAR(255)",
    req: true,
  },
  first_name: {
    type: "VARCHAR(255)",
    req: true,
  },
  date_of_birth: {
    type: "VARCHAR(255)",
    req: true,
  },
  place_of_birth: {
    type: "VARCHAR(255)",
    req: true,
  },
  country_of_birth: {
    type: "VARCHAR(255)",
    req: true,
  },
  current_nationality: {
    type: "VARCHAR(255)",
    req: true,
  },
  nationality_at_birth: {
    type: "VARCHAR(255)",
    req: true,
  },
  other_nationalities: {
    type: "VARCHAR(255)",
    req: true,
  },
  sex: {
    type: "VARCHAR(255)",
    req: true,
  },
  civil_status: {
    type: "VARCHAR(255)",
    req: true,
  },
  parental_authority: {
    type: "VARCHAR(255)",
    req: true,
  },
  national_identity_number: {
    type: "VARCHAR(255)",
    req: true,
  },
  type_of_travel_document: {
    type: "VARCHAR(255)",
    req: true,
  },
  passport_number: {
    type: "VARCHAR(255)",
    req: true,
  },
  passport_issue_date: {
    type: "VARCHAR(255)",
    req: true,
  },
  passport_expire_date: {
    type: "VARCHAR(255)",
    req: true,
  },
  passport_issued_country: {
    type: "VARCHAR(255)",
    req: true,
  },
  uk_family_surname: {
    type: "VARCHAR(255)",
    req: true,
  },
  uk_family_first_name: {
    type: "VARCHAR(255)",
    req: true,
  },
  uk_family_date_of_birth: {
    type: "VARCHAR(255)",
    req: true,
  },
  uk_family_nationality: {
    type: "VARCHAR(255)",
    req: true,
  },
  uk_family_passport_or_id: {
    type: "VARCHAR(255)",
    req: true,
  },
  uk_family_relationship: {
    type: "VARCHAR(255)",
    req: true,
  },
  home_email: {
    type: "VARCHAR(255)",
    req: true,
  },
  home_address: {
    type: "VARCHAR(255)",
    req: true,
  },
  phone: {
    type: "VARCHAR(255)",
    req: true,
  },
  residence_in_a_country_equivalent: {
    type: "VARCHAR(255)",
    req: true,
  },
  residence_in_a_country_no: {
    type: "VARCHAR(255)",
    req: true,
  },
  residence_in_a_country_valid: {
    type: "VARCHAR(255)",
    req: true,
  },
  current_occupation: {
    type: "VARCHAR(255)",
    req: true,
  },
  employer_and_employers_address: {
    type: "VARCHAR(255)",
    req: true,
  },
  purpose_of_the_journey: {
    type: "VARCHAR(255)",
    req: true,
  },
  additional_info_purpose: {
    type: "VARCHAR(255)",
    req: true,
  },
  member_state_of_main_destination: {
    type: "VARCHAR(255)",
    req: true,
  },
  member_state_of_first_entry: {
    type: "VARCHAR(255)",
    req: true,
  },
  number_of_entries_requested: {
    // 27
    type: "VARCHAR(255)",
    req: true,
  },
  date_of_arrival: {
    type: "VARCHAR(255)",
    req: true,
  },
  date_of_departure: {
    type: "VARCHAR(255)",
    req: true,
  },
  fingerprint_collection: {
    type: "VARCHAR(255)",
    req: true,
  },
  entry_permit_for_the_final_country: {
    type: "VARCHAR(255)",
    req: true,
  },
  address_of_inviting_person_or_hotel: {
    type: "VARCHAR(255)",
    req: true,
  },
  phone_of_inviting_person_or_hotel: {
    type: "VARCHAR(255)",
    req: true,
  },
  address_of_inviting_company_org: {
    type: "VARCHAR(255)",
    req: true,
  },
  phone_of_inviting_company_org: {
    // 31
    type: "VARCHAR(255)",
    req: true,
  },
  contact_person_of_inviting_company: {
    // 31
    type: "VARCHAR(255)",
    req: true,
  },
  cost_of_travel_and_living: {
    // 32
    type: "VARCHAR(255)",
    req: true,
  },
  apply_by: {
    // 32
    type: "LONGTEXT",
    req: true,
  },
  status: {
    // 32
    type: "VARCHAR(255)",
    req: true,
  },
});

const Schengen = new Model(SchengenSchema, "Schengen_data");

module.exports = Schengen;
