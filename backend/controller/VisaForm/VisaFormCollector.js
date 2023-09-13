const Schengen = require('../../model/Schengen');

const VisaFormColector = () => {

    return {
        schengen: async (req, res) => {
            console.log('rese');
            try {
                const { body } = req;

                const resdb = await Schengen.Add({
                       surname: "demo data",
                       first_name: "demo data",
                       date_of_birth:"demo data",
                       place_of_birth: "demo data",
                       country_of_birth: "demo data",
                       current_nationality: "demo data",
                       nationality_at_birth: "demo data",
                       other_nationalities: "demo data",
                       sex: "demo data",
                       civil_status:"demo data",
                       parental_authority:"demo data",
                       national_identity_number: "demo data",
                       type_of_travel_document: "demo data",
                       passport_number: "demo data",
                       passport_issue_date: "demo data",
                       passport_expire_date: "demo data",
                       passport_issued_country: "demo data",
                       uk_family_surname: "demo data",
                       uk_family_first_name: "demo data",
                       uk_family_date_of_birth:"demo data",
                       uk_family_nationality: "demo data",
                       uk_family_passport_or_id: "demo data",
                       uk_family_relationship:"demo data",
                       uk_family_home_address_email:"demo data",
                       uk_family_phone: "demo data",
                       residence_in_a_country_other_then: "demo data",
                       current_occupation: "demo data",
                       employer_and_employers_address: "demo data",
                       purpose_of_the_journey: "demo data",
                       additional_info_purpose:"demo data",
                       member_state_of_main_destination:"demo data",
                       member_state_of_first_entry: "demo data",
                       number_of_entries_requested: "demo data",
                       fingerprint_collection: "demo data",
                       entry_permit_for_the_final_country: "demo data",
                       address_of_inviting_person_or_hotel:"demo data",
                       phone_of_inviting_person_or_hotel: "demo data",
                       address_of_inviting_company_org: "demo data",
                       phone_of_inviting_company_org: "demo data",
                       contact_person_of_inviting_company: "demo data",
                       cost_of_travel_and_living: "demo data",
                       apply_by: JSON.stringify(req.User),
                })
                console.log("🚀 ~ file: VisaFormCollector.js:55 ~ schengen: ~ resdb:", resdb)



                console.log("🚀 ~ file: VisaFormCollector.js:9 ~ schengen: ~ body:", body)

            } catch (error) {
                console.log("🚀 ~ file: VisaFormCollector.js:5 ~ VisaFormColector ~ error:", error)

            }
        }
    }

}


module.exports = VisaFormColector;