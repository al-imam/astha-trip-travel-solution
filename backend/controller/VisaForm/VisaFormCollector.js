const Schengen = require('../../model/Schengen');

const VisaFormColector = () => {

    return {
        schengen: async (req, res) => {
            console.log('rese');
            try {
                const { body } = req;

                const resdb = await Schengen.Add({
                       surname: body['surname'],
                       first_name: body["first-name"],
                       date_of_birth:body["date-of-birth"],
                       place_of_birth:body["place-of-birth"],
                       country_of_birth: body["country-of-birth"],
                       current_nationality: body["current-nationality"],
                       nationality_at_birth: body["nationality-at-birth"],
                       other_nationalities: body["other-nationalities"],
                       sex: body["sex"],
                       civil_status:body["civil-status"],
                       parental_authority:body["parental-authority"],
                       national_identity_number: body["national-identity-number"],
                       type_of_travel_document: body["travel-document-type"],
                       passport_number: body["passport-number"],
                       passport_issue_date: body["date-of-issue"],
                       passport_expire_date: body["valid-until"],
                       passport_issued_country: body["issued-country"],
                       uk_family_surname: body["citizen-surname"],
                       uk_family_first_name: body["citizen-first-name"],
                       uk_family_date_of_birth:body["citizen-date-of-birth"],
                       uk_family_nationality: body["citizen-nationality"],
                       uk_family_passport_or_id: body["citizen-travel-document-number"],
                       uk_family_relationship:body["citizen-relationship"],
                       home_email:body["email-address"],
                       home_address:body["home-address"],
                       phone: body["telephone-no"],
                       residence_in_a_country_equivalent: body["resident-permit-or-equivalent"],
                       residence_in_a_country_no: body["resident-no"],
                       residence_in_a_country_valid: body["resident-valid-until"],
                       current_occupation: body["current-occupation"],
                       employer_and_employers_address: body[ "employers-address-telephone-number"],
                       purpose_of_the_journey: body["purpose-of-journey"],
                       additional_info_purpose:body["purpose-of-journey-additional"],
                       member_state_of_main_destination:body["main-destination"],
                       member_state_of_first_entry: body["first-entry"],
                       number_of_entries_requested: body["number-of-entries-requested"],
                       fingerprint_collection:JSON.stringify({
                        date:body["previously-collected-fingerprints-date"],
                        sticker_number:body["previously-collected-fingerprints-visa-no"]
                       }),
                       entry_permit_for_the_final_country: JSON.stringify({
                        issued:Body["destination-issue-by"],
                        valid:body["destination-valid-from"],
                        until:body["destination-valid-to"]
                       }),
                       address_of_inviting_person_or_hotel:body["surname-and-first-name-of-inviting-persons"],
                       phone_of_inviting_person_or_hotel: body["telephone-no-of-inviting-persons"],
                       address_of_inviting_company_org: body[],
                       phone_of_inviting_company_org: body,
                       contact_person_of_inviting_company: body,
                       cost_of_travel_and_living: body,
                       apply_by: JSON.stringify(req.User),
                })
                console.log("🚀 ~ file: VisaFormCollector.js:55 ~ schengen: ~ resdb:", resdb)



                console.log("🚀 ~ file: VisaFormCollector.js:9 ~ schengen: ~ body:", body)


              const demo =  {
                    "passport-number": "A23422347",
                    "surname": "Al",
                    "surname-at-birth": "",
                    "first-name": "Imam",
                    "date-of-birth": "2023-09-11",
                    "place-of-birth": "Noakhali",
                    "country-of-birth": "Bangladeshi",
                    "current-nationality": "Bangladeshi",
                    "nationality-at-birth": "Bangladeshi",
                    "other-nationalities": [
                        "Saudi",
                        "Kuwaiti"
                    ],
                    "sex": "Male",
                    "civil-status": "Single",
                    "parental-authority": "lol, lol, lol, lol, lol, lol, lol, lol",
                    "national-identity-number": "349574857",
                    "travel-document-type": "Ordinary passport",
                    "date-of-issue": "2023-09-12",
                    "valid-until": "2023-09-30",
                    "issued-country": "Bangladeshi",
                    "home-address": "Noakhali",
                    "email-address": "alimam01828@gmal.com",
                    "telephone-no": "01881614926",
                    "have-eu-citizen": "Yes",
                    "citizen-surname": "Terror",
                    "citizen-first-name": "Srabon",
                    "citizen-date-of-birth": "2004-01-03",
                    "citizen-nationality": "American",
                    "citizen-travel-document-number": "234234234234",
                    "citizen-relationship": "Child",
                    "residence-in-a-country": "Yes",
                    "resident-permit-or-equivalent": "lol",
                    "resident-no": "342234",
                    "resident-valid-until": "2023-09-30",
                    "employers-address-telephone-number": "terror, 2034, america",
                    "current-occupation": "software engineer",
                    "purpose-of-journey": "Tourism",
                    "purpose-of-journey-additional": "i want to fresh my mind",
                    "main-destination": "schengen, ...",
                    "first-entry": "dhaka",
                    "number-of-entries-requested": "Single entry",
                    "intended-date-of-arrival": "2023-09-19",
                    "intended-date-of-departure": "2023-09-30",
                    "fingerprints-collected-previously": "Yes",
                    "previously-collected-fingerprints-date": "2023-09-03",
                    "previously-collected-fingerprints-visa-no": "324345345",
                    "destination-issue-by": "astha",
                    "destination-valid-from": "2023-09-04",
                    "destination-valid-to": "2023-09-30",
                    "surname-and-first-name-of-inviting-persons": "al, imam, nirob, srabon, seju",
                    "address-email-of-inviting-persons": "alimam@gmail.com",
                    "telephone-no-of-inviting-persons": "45345345",
                    "name-address-of-inviting-company": "Imam, schengen city",
                    "telephone-no-of-inviting-company": "453534534545",
                    "surname-and-first-name-of-contact-persons": "Kovir khan, main city",
                    "cost-of-traveling-and-living": "Cash"
                }

            } catch (error) {
                console.log("🚀 ~ file: VisaFormCollector.js:5 ~ VisaFormColector ~ error:", error)

            }
        }
    }

}


module.exports = VisaFormColector;