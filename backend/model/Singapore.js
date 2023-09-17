const Schema = require('../database/schema');
const Model = require('../database/Model');

const SingaporeSchema = new Schema({
    name: {
        type: 'VARCHAR(255)',
        req: true
    },
    alias: {
        type: 'VARCHAR(255)',
        req: true
    },
    date_of_birth: {
        type: 'VARCHAR(255)',
        req: true
    },
    sex: {
        type: 'VARCHAR(255)',
        req: true
    },
    marital_status: {
        type: 'VARCHAR(255)',
        req: true
    },
    nationality: {
        type: 'LONGTEXT',
        req: true
    },
    country_place_of_birth: {
        type: 'VARCHAR(255)',
        req: true
    },
    state_place_of_birth: {
        type: 'VARCHAR(255)',
        req: true
    },
    race: {
        type: 'VARCHAR(255)',
        req: true
    },
    citizenship: {
        type: 'VARCHAR(255)',
        req: true
    },
    type_of_passport: {
        type: 'VARCHAR(255)',
        req: true
    },
    passport_number: {
        type: 'VARCHAR(255)',
        req: true
    },
    passport_issue_date: {
        type: 'VARCHAR(255)',
        req: true
    },
    passport_expire_date: {
        type: 'VARCHAR(255)',
        req: true
    },
    passport_issue_country: {
        type: 'VARCHAR(255)',
        req: true
    },
    prc_id_number: {
        type: 'VARCHAR(255)',
        req: true
    },
    residence_country: {
        type: 'VARCHAR(255)',
        req: true
    },
    residence_state: {
        type: 'VARCHAR(255)',
        req: true
    },
    residence_origin: {
        type: 'VARCHAR(255)',
        req: true
    },
    residence_district: {
        type: 'VARCHAR(255)',
        req: true
    },
    residence_address: {
        type: 'VARCHAR(255)',
        req: true
    },
    email: {
        type: 'VARCHAR(255)',
        req: true
    },
    contact_number: {
        type: 'VARCHAR(255)',
        req: true
    },
    occupation: {
        type: 'VARCHAR(255)',
        req: true
    },
    high_academic: {
        type: 'VARCHAR(255)',
        req: true
    },
    qualifications_attained: {
        type: 'VARCHAR(255)',
        req: true
    },
    annual_income: {
        type: 'VARCHAR(255)',
        req: true
    },
    religion: {
        type: 'VARCHAR(255)',
        req: true
    },
    expected_date_of_arrival: {
        type: 'VARCHAR(255)',
        req: true
    },
    type_of_visa: {
        type: 'VARCHAR(255)',
        req: true
    },
    purpose_of_visit: {
        type: 'VARCHAR(255)',
        req: true
    },
    details_of_purpose: {
        type: 'VARCHAR(255)',
        req: true
    },
    // Address in singapore 
    stay_in_singapore: {
        type: 'VARCHAR(255)',
        req: true
    },
    block: {
        type: 'VARCHAR(255)',
        req: true
    },
    floor: {
        type: 'VARCHAR(255)',
        req: true
    },
    unit_number: {
        type: 'VARCHAR(255)',
        req: true
    },
    postal_code: {
        type: 'VARCHAR(255)',
        req: true
    },
    street_name: {
        type: 'VARCHAR(255)',
        req: true
    },
    singapore_contact_number: {
        type: 'VARCHAR(255)',
        req: true
    },
    building_name: {
        type: 'VARCHAR(255)',
        req: true
    },
    did_you_reside_in_other_countries: {
        type: 'LONGTEXT',
        req: true
    },
    relationship_of_travel_companion: {
        type: 'VARCHAR(255)',
        req: true
    },
    companion_name: {
        type: 'VARCHAR(255)',
        req: true
    },
    companion_date_of_birth: {
        type: 'VARCHAR(255)',
        req: true
    },
    companion_sex: {
        type: 'VARCHAR(255)',
        req: true
    },
    companion_nationality: {
        type: 'VARCHAR(255)',
        req: true
    },
    companion_passport_number: {
        type: 'VARCHAR(255)',
        req: true
    },
    // local contact 
    local_contact_name: {
        type: 'VARCHAR(255)',
        req: true
    },
    local_contact_relation: {
        type: 'VARCHAR(255)',
        req: true
    },
    local_contact_contact_number: {
        type: 'VARCHAR(255)',
        req: true
    },
    local_contact_email: {
        type: 'VARCHAR(255)',
        req: true
    },
    antecedent_of_applicant: {
        type: 'VARCHAR(255)',
        req: true
    },


    status: {
        // 32
        type: "VARCHAR(255)",
        req: true,
    },
    apply_by: {
        // 32
        type: "VARCHAR(255)",
        req: true,
    },

});

const Singapore = new Model(SingaporeSchema, "singapore_data")

module.exports = Singapore;