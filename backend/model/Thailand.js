const Schema = require('../database/schema');
const Model = require('../database/Model');

const ThailandSchema = new Schema({
    first_name: {
        type: 'VARCHAR(255)',
        req: true
    },
    middle_name: {
        type: 'VARCHAR(255)',
        req: true
    },
    family_name: {
        type: 'VARCHAR(255)',
        req: true
    },
    former_name: {
        type: 'VARCHAR(255)',
        req: true
    },
    nationality: {
        type: 'VARCHAR(255)',
        req: true
    },
    nationality_at_birth: {
        type: 'VARCHAR(255)',
        req: true
    },
    birth_place: {
        type: 'VARCHAR(255)',
        req: true
    },
    marital_status: {
        type: 'VARCHAR(255)',
        req: true
    },
    date_of_birth: {
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
    passport_issued_at: {
        type: 'VARCHAR(255)',
        req: true
    },
   passport_issue_date: {
        type: 'VARCHAR(255)',
        req: true
    },
    passport_expiry_date: {
        type: 'VARCHAR(255)',
        req: true
    },
    occupation: {
        type: 'LONGTEXT',
        req: true
    },
    current_address: {
        type: 'VARCHAR(255)',
        req: true
    },
    phone: {
        type: 'VARCHAR(255)',
        req: true
    },
    email: {
        type: 'VARCHAR(255)',
        req: true
    },
    permanent_address: {
        type: 'VARCHAR(255)',
        req: true
    },
    permanent_phone: {
        type: 'VARCHAR(255)',
        req: true
    },
    minor_children_info: {
        type: 'VARCHAR(255)',
        req: true
    },
    arrival_date_thailand: {
        type: 'VARCHAR(255)',
        req: true
    },
    travel_by: {
        type: 'VARCHAR(255)',
        req: true
    },
    flight_no: {
        type: 'VARCHAR(255)',
        req: true
    },
    stay_duration: {
        type: 'VARCHAR(255)',
        req: true
    },
    date_of_previous_visit: {
        type: 'VARCHAR(255)',
        req: true
    },
    purpose_of_visit: {
        type: 'VARCHAR(255)',
        req: true
    },
    country_of_passport_valid: {
        type: 'VARCHAR(255)',
        req: true
    },
    address_in_thailand: {
        type: 'VARCHAR(255)',
        req: true
    },
    local_guarantor: {
        type: 'VARCHAR(255)',
        req: true
    },
    local_contact_phone: {
        type: 'VARCHAR(255)',
        req: true
    },
    thailand_guarantor: {
        type: 'VARCHAR(255)',
        req: true
    },
    thailand_contact_phone: {
        type: 'VARCHAR(255)',
        req: true
    },
    type_of_visa: {
        type: 'VARCHAR(255)',
        req: true
    },
    number_of_entry: {
        type: 'VARCHAR(255)',
        req: true
    },
    status: {
        // 32
        type: "VARCHAR(255)",
        req: true,
    },
    // Address i
    apply_by: {
        // 32
        type: "VARCHAR(255)",
        req: true,
    },

});

const Thailand = new Model(ThailandSchema, "Thailand_data")

module.exports = Thailand;