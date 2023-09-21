import axios from "axios";
import { Button } from "components/form/Button";
import { Group, Join } from "components/form/Group";
import { Input } from "components/form/Input";
import { AsyncSelect, Select, SelectNotCreatable } from "components/form/Select";
import { StepIndicator } from "components/form/StepIndicator";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import countries from "../countries.json";
import districts from "../districts.json";
import { Spinner } from "./Spinner";
import { fire, flattenObject, populate, setValue } from "./util";
import { useAuth } from "hook/useAuth";

const countriesOptions = countries.map((e) => ({
  label: e.name,
  value: e.nationality,
}));

const placeOfBirthOptions = districts.map((value) => ({
  label: value,
  value,
}));

const citizenRelationshipOptions = [
  "Spouse",
  "Child",
  "Grandchild",
  "Dependent ascendant",
  "Registered partnership",
].map((value) => ({
  label: value,
  value,
}));

const nationalityOptions = countries.map(({ nationality }) => ({
  label: nationality,
  value: nationality,
}));

const documentTypeOptions = ["Ordinary", "Diplomatic", "Service", "Official", "Special"].map((value) => ({
  label: `${value} passport`,
  value: `${value} passport`,
}));

const civilStatusOptions = ["Single", "Married", "Registered Partnership", "Separated", "Divorced", "Widow(er)"].map(
  (value) => ({
    label: value,
    value,
  })
);

const sexesOption = ["Male", "Female"].map((value) => ({
  label: value,
  value,
}));

const purposeOfJourneyOptions = [
  "Tourism",
  "Business",
  "Visiting family or friends",
  "Cultural",
  "Sports",
  "Official visit",
  "Medical reasons",
  "Study",
  "Airport transit",
].map((value) => ({
  label: value,
  value,
}));

const numberOfEntryRequestOptions = ["Single entry", "Two entries", "Multiple entries"].map((value) => ({
  label: value,
  value,
}));

const costOfTravelingAndLivingOptions = [
  "by the applicant himself/herself Means of support",
  "Cash",
  "Traveler's cheques",
  "Credit card",
  "Prepaid accommodation",
  "Prepaid transport",
].map((value) => ({
  label: value,
  value,
}));

const steps = ["", "", "", ""];

const localPersonal = "schengen-personal-submit";
const localTravel = "schengen-travel-submit";
const localContact = "schengen-contact-submit";
const localInfo = "schengen-info-submit";

export function Schengen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const auth = useAuth();

  const personal = useForm();
  const travel = useForm();
  const contact = useForm();
  const info = useForm();

  const number = personal.watch("passport-number") || {};

  const isResidence = contact.watch("residence-in-a-country") === "Yes";
  const isEuCitizen = travel.watch("have-eu-citizen") === "Yes";
  const isFingerprintsCollectedPreviously = info.watch("fingerprints-collected-previously") === "Yes";

  /* 
  useFormPersist(localPersonal, {
    watch: personal.watch,
    setValue: personal.setValue,
    storage: window.localStorage,
    exclude: ["passport-number"],
  });

  useFormPersist(localTravel, {
    watch: travel.watch,
    setValue: travel.setValue,
    storage: window.localStorage,
  });

  useFormPersist(localContact, {
    watch: contact.watch,
    setValue: contact.setValue,
    storage: window.localStorage,
  });

  useFormPersist(localInfo, {
    watch: info.watch,
    setValue: info.setValue,
    storage: window.localStorage,
  });
 */
  function personalSubmit(data) {
    setForm((prev) => Object.assign(prev, flattenObject(data)));
    setStep(2);
  }

  function travelSubmit(data) {
    setForm((prev) => Object.assign(prev, flattenObject(data)));
    setStep(3);
  }

  function contactSubmit(data) {
    setForm((prev) => Object.assign(prev, flattenObject(data)));
    setStep(4);
  }

  async function infoSubmit(__d) {
    await new Promise((r) => setTimeout(r, 5000));
    const data = flattenObject(Object.assign(form, __d));

    const serverRes = await axios.post("/api/visa-form/schengen", data).catch(console.log);
    if (!serverRes) return fire();
    fire("Successfully Done!", "success");

    setForm({});
    localStorage.removeItem(localContact);
    localStorage.removeItem(localInfo);
    localStorage.removeItem(localTravel);
    localStorage.removeItem(localPersonal);
    if (auth.admin) return navigate("/admin");
    navigate("/agent");
  }

  useEffect(() => {
    if (number.__isNew__ || !number.value) return;

    populate(number.value, (_value) => {
      const db = _value.schengen;
      if (!db) return;

      setValue(db["surname"], (_v) => personal.setValue("surname", _v));
      setValue(db["surname_at_birth"], (_v) => personal.setValue("surname-at-birth", _v));
      setValue(db["first_name"], (_v) => personal.setValue("first-name", _v));
      setValue(db["date_of_birth"], (_v) => personal.setValue("date-of-birth", _v));
      setValue(db["place_of_birth"], (_v) => personal.setValue("place-of-birth", _v), true);
      setValue(db["country_of_birth"], (_v) => personal.setValue("country-of-birth", _v), true);
      setValue(db["current_nationality"], (_v) => personal.setValue("current-nationality", _v), true);
      setValue(db["civil_status"], (_v) => personal.setValue("civil-status", _v), true);
      setValue(db["sex"], (_v) => personal.setValue("sex", _v), true);
      setValue(db["nationality_at_birth"], (_v) => personal.setValue("nationality-at-birth", _v), true);
      setValue(db["other_nationalities"], (_v) => personal.setValue("other-nationalities", _v), true);
      setValue(db["parental_authority"], (_v) => personal.setValue("parental-authority", _v));

      setValue(db["national_identity_number"], (_v) => travel.setValue("national-identity-number", _v));
      setValue(db["type_of_travel_document"], (_v) => travel.setValue("travel-document-type", _v), true);
      setValue(db["passport_issue_date"], (_v) => travel.setValue("date-of-issue", _v));
      setValue(db["passport_expire_date"], (_v) => travel.setValue("valid-until", _v));
      setValue(db["passport_issued_country"], (_v) => travel.setValue("issued-country", _v), true);
      setValue(db["home_address"], (_v) => travel.setValue("home-address", _v));
      setValue(db["home_email"], (_v) => travel.setValue("email-address", _v));
      setValue(db["phone"], (_v) => travel.setValue("telephone-no", _v));

      setValue(db["uk_family_surname"] ? "Yes" : "No", (_v) => travel.setValue("have-eu-citizen", _v));
      setValue(db["uk_family_surname"], (_v) => travel.setValue("citizen-surname", _v));
      setValue(db["uk_family_first_name"], (_v) => travel.setValue("citizen-first-name", _v));
      setValue(db["uk_family_date_of_birth"], (_v) => travel.setValue("citizen-date-of-birth", _v));
      setValue(db["uk_family_passport_or_id"], (_v) => travel.setValue("citizen-travel-document-number", _v));
      setValue(db["uk_family_nationality"], (_v) => travel.setValue("citizen-nationality", _v), true);
      setValue(db["uk_family_relationship"], (_v) => travel.setValue("citizen-relationship", _v), true);

      setValue(db["residence_in_a_country_no"] ? "Yes" : "No", (_v) => contact.setValue("residence-in-a-country", _v));
      setValue(db["residence_in_a_country_equivalent"], (_v) => contact.setValue("resident-permit-or-equivalent", _v));
      setValue(db["residence_in_a_country_no"], (_v) => contact.setValue("resident-no", _v));
      setValue(db["residence_in_a_country_valid"], (_v) => contact.setValue("resident-valid-until", _v));

      setValue(db["employer_and_employers_address"], (v) => contact.setValue("employers-address-telephone-number", v));
      setValue(db["current_occupation"], (_v) => contact.setValue("current-occupation", _v));
      setValue(db["purpose_of_the_journey"], (_v) => contact.setValue("purpose-of-journey", _v), true);
      setValue(db["additional_info_purpose"], (_v) => contact.setValue("purpose-of-journey-additional", _v));
      setValue(db["member_state_of_main_destination"], (_v) => contact.setValue("main-destination", _v));
      setValue(db["member_state_of_first_entry"], (_v) => contact.setValue("first-entry", _v));
    });
  }, [number.value]);

  return (
    <main className="container mx-auto space-y-4 p-4">
      <button
        disabled={
          personal.formState.isSubmitting ||
          travel.formState.isSubmitting ||
          info.formState.isSubmitting ||
          contact.formState.isSubmitting
        }
        onClick={() => navigate(-1)}
        className="my-1 inline-flex items-center rounded-md border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-blue-700 shadow hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-0"
      >
        <NextIcon className="mr-2 scale-x-[-1]" />
        <span>
          <span className="hidden md:inline"> Back to </span>dashboard
        </span>
      </button>

      <div className="space-y-4 rounded border border-gray-200 bg-white px-4 py-8 shadow-sm ">
        <StepIndicator steps={steps} current={step} />

        {step === 1 && (
          <form
            name="personal"
            className="space-y-4"
            onSubmit={personal.handleSubmit(personalSubmit)}
            autoComplete="off"
          >
            <fieldset disabled={personal.formState.isSubmitting} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AsyncSelect
                label="Passport Number *"
                placeholder="Select passport number"
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="passport-number"
                register={personal.register("passport-number", { required: "Travel document number is required" })}
                error={personal.formState.errors["passport-number"]}
              />

              <Input
                label="Surname *"
                placeholder="Surname"
                register={personal.register("surname", { required: "Surname is required" })}
                error={personal.formState.errors["surname"]}
              />

              <Input
                label="Surname At Birth"
                register={personal.register("surname-at-birth")}
                error={personal.formState.errors["surname-at-birth"]}
              />

              <Input
                label="Fist Name *"
                placeholder="Fist name"
                register={personal.register("first-name", { required: "Fist name is required" })}
                error={personal.formState.errors["first-name"]}
              />

              <Input
                label="Date Of Birth *"
                placeholder="Date of birth"
                register={personal.register("date-of-birth", {
                  required: "Birth date is required",
                  max: { value: new Date().toISOString().split("T")[0], message: "Birth date cannot be future date" },
                })}
                error={personal.formState.errors["date-of-birth"]}
                type="date"
              />

              <Select
                label="Place Of Birth *"
                placeholder="Select place of birth"
                name="place-of-birth"
                options={placeOfBirthOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                register={personal.register("place-of-birth", { required: "Place of birth is required" })}
                error={personal.formState.errors["place-of-birth"]}
              />

              <Select
                label="Country Of Birth *"
                options={countriesOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                placeholder="Select country of birth"
                name="country-of-birth"
                register={personal.register("country-of-birth", { required: "Country of birth is required" })}
                error={personal.formState.errors["country-of-birth"]}
              />

              <Select
                label="Current Nationality *"
                options={nationalityOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="current-nationality"
                placeholder="Select current nationality"
                register={personal.register("current-nationality", { required: "Current nationality is required" })}
                error={personal.formState.errors["current-nationality"]}
              />

              <Select
                label="Nationality At Birth, If Different"
                placeholder="Select nationality at birth"
                options={nationalityOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="nationality-at-birth"
                isClearable
                register={personal.register("nationality-at-birth")}
                error={personal.formState.errors["nationality-at-birth"]}
              />

              <Select
                label="Other Nationalities, If You Have"
                placeholder="Select other nationalities "
                options={nationalityOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="other-nationalities"
                isClearable
                isMulti
                register={personal.register("other-nationalities")}
                error={personal.formState.errors["other-nationalities"]}
              />

              <SelectNotCreatable
                label="Sex (Gender) *"
                options={sexesOption}
                placeholder="Select your gender"
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="sex"
                isSearchable={false}
                register={personal.register("sex", { required: "Sex (gender) is required" })}
                error={personal.formState.errors["sex"]}
              />
              <Select
                label="Civil Status *"
                options={civilStatusOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="civil-status"
                placeholder="Select civil status"
                register={personal.register("civil-status", { required: "Civil status is required" })}
                error={personal.formState.errors["civil-status"]}
              />

              <div className="col-span-full">
                <Input
                  label="Parental Authority (In Case Of Minors) /Legal Guardian (Surname, First Name, Address, If Different From Applicant's, Telephone No, E-Mail Address, And Nationality)"
                  placeholder="surname, first name, address, if different from applicant's, telephone no., e-mail address, and nationality"
                  classNameLabel="line-clamp-none"
                  register={personal.register("parental-authority")}
                  error={personal.formState.errors["parental-authority"]}
                />
              </div>
            </fieldset>

            <div className="flex justify-end">
              <Button disabled={personal.formState.isSubmitting} className="disabled:cursor-pointer">
                Next
                {personal.formState.isSubmitting ? <Spinner className="ml-2" /> : <NextIcon className="ml-2" />}
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form name="document" autoComplete="off" className="space-y-4" onSubmit={travel.handleSubmit(travelSubmit)}>
            <fieldset disabled={travel.formState.isSubmitting} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="National Identity Number *"
                placeholder="National identity number"
                register={travel.register("national-identity-number", {
                  required: "National identity number is required",
                })}
                error={travel.formState.errors["national-identity-number"]}
              />

              <Select
                label="Type Of Travel Document *"
                options={documentTypeOptions}
                control={travel.control}
                isDisabled={travel.formState.isSubmitting}
                placeholder="Select passport type"
                name="travel-document-type"
                register={travel.register("travel-document-type", { required: "Travel document type is required" })}
                error={travel.formState.errors["travel-document-type"]}
              />

              <Input
                label="Date Of Issue *"
                register={travel.register("date-of-issue", {
                  required: "Issue date is required",
                })}
                error={travel.formState.errors["date-of-issue"]}
                type="date"
              />

              <Input
                label="Valid Until *"
                register={travel.register("valid-until", {
                  required: "Valid until is required",
                })}
                error={travel.formState.errors["valid-until"]}
                type="date"
              />

              <Select
                label="Issued By (Country) *"
                options={countriesOptions}
                control={travel.control}
                isDisabled={travel.formState.isSubmitting}
                placeholder="Select Issued by country"
                name="issued-country"
                register={travel.register("issued-country", { required: "Issued by (country) is required" })}
                error={travel.formState.errors["issued-country"]}
              />

              <Input
                label="Applicant's Home Address *"
                placeholder="Home address"
                register={travel.register("home-address", {
                  required: "Home address is required",
                })}
                error={travel.formState.errors["home-address"]}
              />

              <Input
                label="Applicant's Email Address *"
                placeholder="Email address"
                register={travel.register("email-address", {
                  required: "Email address is required",
                })}
                error={travel.formState.errors["email-address"]}
              />

              <div className="lg:col-span-2">
                <Input
                  label="Applicant's Telephone No *"
                  placeholder="Telephone no"
                  register={travel.register("telephone-no", {
                    required: "Telephone no is required",
                    pattern: { value: /^(\+\d{1,})?(\d+)$/, message: "Invalid telephone" },
                  })}
                  error={travel.formState.errors["telephone-no"]}
                />
              </div>

              <Group
                options={["No", "Yes"]}
                legend="Personal Data Of The Family Member Who Is An Eu, Eea Or Ch Citizen Or An Uk National Who Is A Withdrawal Agreement Beneficiary, Have Any? *"
                classNameContainer="col-span-full"
                checked={isEuCitizen ? 2 : 1}
                register={travel.register("have-eu-citizen", { required: "Answer the question" })}
                error={travel.formState.errors["have-eu-citizen"]}
                isOpen={isEuCitizen}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                disabled={travel.formState.isSubmitting}
              >
                <Input
                  label="Surname *"
                  register={travel.register("citizen-surname", {
                    required: { value: isEuCitizen, message: "Surname is required" },
                  })}
                  error={travel.formState.errors["citizen-surname"]}
                />

                <Input
                  label="Fist Name *"
                  register={travel.register("citizen-first-name", {
                    required: { value: isEuCitizen, message: "First name is required" },
                  })}
                  error={travel.formState.errors["citizen-first-name"]}
                />

                <Input
                  label="Date Of Birth *"
                  register={travel.register("citizen-date-of-birth", {
                    required: { value: isEuCitizen, message: "Date of birth is required" },
                  })}
                  error={travel.formState.errors["citizen-date-of-birth"]}
                  type="date"
                />

                <Select
                  label="Nationality *"
                  options={nationalityOptions}
                  control={travel.control}
                  isDisabled={travel.formState.isSubmitting}
                  name="citizen-nationality"
                  placeholder="Select nationality"
                  register={travel.register("citizen-nationality", {
                    required: { value: isEuCitizen, message: "Nationality is required" },
                  })}
                  error={travel.formState.errors["citizen-nationality"]}
                />

                <div className="col-span-full md:col-span-2">
                  <Input
                    label="Passport Number Or Id Card *"
                    placeholder="Travel document number"
                    register={travel.register("citizen-travel-document-number", {
                      required: { value: isEuCitizen, message: "Passport number or ID card is required" },
                    })}
                    error={travel.formState.errors["citizen-travel-document-number"]}
                  />
                </div>

                <div className="col-span-full">
                  <Select
                    label="Family Relationship With An Eu, Eea Or Ch Citizen Or An Uk National Who Is A Withdrawal Agreement Beneficiary, If Applicable *"
                    options={citizenRelationshipOptions}
                    control={travel.control}
                    isDisabled={travel.formState.isSubmitting}
                    name="citizen-relationship"
                    isClearable
                    classNameLabel="line-clamp-none"
                    placeholder="Select relationship"
                    register={travel.register("citizen-relationship", {
                      required: { value: isEuCitizen, message: "Relationship is required" },
                    })}
                    error={travel.formState.errors["citizen-relationship"]}
                  />
                </div>
              </Group>
            </fieldset>

            <div className="flex justify-between">
              <Button
                disabled={travel.formState.isSubmitting}
                className="disabled:opacity-0"
                type="button"
                onClick={() => setStep(1)}
              >
                <NextIcon className="mr-2 scale-x-[-1] cursor-none" /> Previous
              </Button>
              <Button disabled={travel.formState.isSubmitting} className="disabled:cursor-pointer">
                Next
                {travel.formState.isSubmitting ? <Spinner className="ml-2" /> : <NextIcon className="ml-2" />}
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form name="document" autoComplete="off" className="space-y-4" onSubmit={contact.handleSubmit(contactSubmit)}>
            <fieldset disabled={contact.formState.isSubmitting} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Group
                options={["No", "Yes"]}
                legend="Residence In A Country Other Than The Country Of Current Nationality? *"
                classNameContainer="col-span-full"
                checked={isResidence ? 2 : 1}
                register={contact.register("residence-in-a-country", { required: "Residence is required" })}
                error={contact.formState.errors["residence-in-a-country"]}
                disabled={contact.formState.isSubmitting}
                isOpen={isResidence}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                <Input
                  label="Resident Permit Or Equivalent *"
                  register={contact.register("resident-permit-or-equivalent", {
                    required: { value: isResidence, message: "Telephone no is required" },
                  })}
                  error={contact.formState.errors["resident-permit-or-equivalent"]}
                />

                <Input
                  label="No (Resident) *"
                  register={contact.register("resident-no", {
                    required: { value: isResidence, message: "No is required" },
                  })}
                  error={contact.formState.errors["resident-no"]}
                />

                <Input
                  label="Valid Until *"
                  register={contact.register("resident-valid-until", {
                    required: { value: isResidence, message: "Valid until is required" },
                  })}
                  error={contact.formState.errors["resident-valid-until"]}
                  type="date"
                />
              </Group>

              <div className="col-span-full">
                <Input
                  label="Employer And Employer's Address And Telephone Number. For Students, Name And Address Of Educational Establishment. *"
                  classNameLabel="line-clamp-none"
                  register={contact.register("employers-address-telephone-number", {
                    required: "Employer's address and telephone number is required",
                  })}
                  error={contact.formState.errors["employers-address-telephone-number"]}
                />
              </div>

              <Input
                label="Current Occupation *"
                register={contact.register("current-occupation", {
                  required: "Current occupation is required",
                })}
                error={contact.formState.errors["current-occupation"]}
              />

              <Select
                label="Purpose(s) Of The Journey *"
                control={contact.control}
                options={purposeOfJourneyOptions}
                isDisabled={contact.formState.isSubmitting}
                name="purpose-of-journey"
                register={contact.register("purpose-of-journey", {
                  required: "Purpose(s) of the journey is required",
                })}
                error={contact.formState.errors["purpose-of-journey"]}
              />

              <Input
                label="Additional Info On Purpose Of Stay *"
                register={contact.register("purpose-of-journey-additional", {
                  required: "Additional information on purpose of stay is required",
                })}
                error={contact.formState.errors["purpose-of-journey-additional"]}
              />

              <Input
                label="Member State Of Main Destination (And Other Member States Of Destination, If Applicable) *"
                placeholder="Member State of main destination"
                register={contact.register("main-destination", {
                  required: "Main destination is required",
                })}
                error={contact.formState.errors["main-destination"]}
              />
              <Input
                label="Member State Of First Entry *"
                register={contact.register("first-entry", {
                  required: "Member state of first entry is required",
                })}
                error={contact.formState.errors["first-entry"]}
              />

              <SelectNotCreatable
                label="Number Of Entries Requested *"
                placeholder="Select Number of entries requested"
                options={numberOfEntryRequestOptions}
                control={contact.control}
                isDisabled={contact.formState.isSubmitting}
                name="number-of-entries-requested"
                register={contact.register("number-of-entries-requested", {
                  required: "Number of entries requested is required",
                })}
                error={contact.formState.errors["number-of-entries-requested"]}
              />
            </fieldset>

            <div className="flex justify-between">
              <Button
                disabled={contact.formState.isSubmitting}
                className="disabled:opacity-0"
                type="button"
                onClick={() => setStep(2)}
              >
                <NextIcon className="mr-2 scale-x-[-1] cursor-none" /> Previous
              </Button>
              <Button disabled={contact.formState.isSubmitting} className="disabled:cursor-pointer">
                Next
                {contact.formState.isSubmitting ? <Spinner className="ml-2" /> : <NextIcon className="ml-2" />}
              </Button>
            </div>
          </form>
        )}

        {step === 4 && (
          <form name="document" autoComplete="off" className="space-y-4" onSubmit={info.handleSubmit(infoSubmit)}>
            <fieldset disabled={info.formState.isSubmitting} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-full flex flex-col gap-4 md:flex-row [&>*]:flex-1">
                <Input
                  label="Intended Date Of Arrival Of First Intended Stay In The Schengen Area *"
                  placeholder="Intended date of arrival"
                  register={info.register("intended-date-of-arrival", {
                    required: "Intended date of arrival is required",
                  })}
                  error={info.formState.errors["intended-date-of-arrival"]}
                  type="date"
                />

                <Input
                  label="Intended Date Of Departure From Schengen Area After The First Intended Stay *"
                  placeholder="Intended date of arrival"
                  register={info.register("intended-date-of-departure", {
                    required: "Intended date of departure is required",
                  })}
                  error={info.formState.errors["intended-date-of-departure"]}
                  type="date"
                />
              </div>

              <Group
                options={["No", "Yes"]}
                legend="Fingerprints Collected Previously For The Purpose Of Applying For A Schengen Visa? *"
                classNameContainer="col-span-full"
                checked={isFingerprintsCollectedPreviously ? 2 : 1}
                register={info.register("fingerprints-collected-previously", {
                  required: "Fingerprints collected previously is required",
                })}
                error={info.formState.errors["fingerprints-collected-previously"]}
                isOpen={isFingerprintsCollectedPreviously}
                className="flex flex-col gap-4 md:flex-row [&>*]:flex-1"
                disabled={info.formState.isSubmitting}
              >
                <Input
                  label="Previously Collected Fingerprints Date, If You Know"
                  register={info.register("previously-collected-fingerprints-date")}
                  error={info.formState.errors["previously-collected-fingerprints-date"]}
                  type="date"
                />

                <Input
                  label="Previously Collected Fingerprints Visa No, If You Know"
                  register={info.register("previously-collected-fingerprints-visa-no")}
                  error={info.formState.errors["previously-collected-fingerprints-visa-no"]}
                />
              </Group>

              <Join
                legend="Entry Permit For The Final Country Of Destination, Where Applicable"
                classNameContainer="col-span-full"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                <Input
                  label="Issue By"
                  register={info.register("destination-issue-by")}
                  error={info.formState.errors["destination-issue-by"]}
                />

                <Input
                  label="Valid From"
                  placeholder="Intended date of arrival"
                  register={info.register("destination-valid-from")}
                  error={info.formState.errors["destination-valid-from"]}
                  type="date"
                />

                <Input
                  label="Valid Until"
                  register={info.register("destination-valid-to")}
                  error={info.formState.errors["destination-valid-to"]}
                  type="date"
                />
              </Join>

              <div className="col-span-full">
                <Input
                  label="Surname And First Name Of The Inviting Person In The Member State. If Not Applicable, Name Of Hotel Or Temporary Accommodation In The Member State"
                  register={info.register("surname-and-first-name-of-inviting-persons")}
                  error={info.formState.errors["surname-and-first-name-of-inviting-persons"]}
                  classNameLabel="line-clamp-none"
                />
              </div>

              <div className="col-span-full">
                <Input
                  label="Address And E-Mail Address Of Inviting Person/Hotel Temporary Accommodation"
                  register={info.register("address-email-of-inviting-persons")}
                  error={info.formState.errors["address-email-of-inviting-persons"]}
                  classNameLabel="line-clamp-none"
                />
              </div>

              <Input
                label="Telephone No Of Inviting Person"
                register={info.register("telephone-no-of-inviting-persons")}
                error={info.formState.errors["telephone-no-of-inviting-persons"]}
              />

              <Input
                label="Name And Address Of Inviting Com/Org"
                register={info.register("name-address-of-inviting-company")}
                error={info.formState.errors["name-address-of-inviting-company"]}
              />

              <Input
                label="Telephone No Of Company/Organization"
                register={info.register("telephone-no-of-inviting-company")}
                error={info.formState.errors["telephone-no-of-inviting-company"]}
              />

              <div className="col-span-full">
                <Input
                  label="Surname, First Name, Address, Telephone No. And E-Mail Address Of Contact Person In Company/Organization"
                  register={info.register("surname-and-first-name-of-contact-persons")}
                  error={info.formState.errors["surname-and-first-name-of-contact-persons"]}
                  classNameLabel="line-clamp-none"
                />
              </div>

              <div className="col-span-full">
                <Select
                  label="Cost Of Traveling And Living During The Applicant's Stay Is Covered *"
                  classNameLabel="line-clamp-none"
                  options={costOfTravelingAndLivingOptions}
                  control={info.control}
                  isDisabled={info.formState.isSubmitting}
                  isMulti
                  name="cost-of-traveling-and-living"
                  register={info.register("cost-of-traveling-and-living", {
                    required: "Cost of traveling and living during the applicant's stay is covered is required",
                  })}
                  error={info.formState.errors["cost-of-traveling-and-living"]}
                />
              </div>
            </fieldset>

            <div className="flex justify-between">
              <Button
                disabled={info.formState.isSubmitting}
                className="disabled:opacity-0"
                type="button"
                onClick={() => setStep(3)}
              >
                <NextIcon className="mr-2 scale-x-[-1] cursor-none" /> Previous
              </Button>
              <Button disabled={info.formState.isSubmitting} className="disabled:cursor-pointer">
                Submit
                {info.formState.isSubmitting ? <Spinner className="ml-2" /> : <NextIcon className="ml-2" />}
              </Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export function NextIcon({ className, ...rest }) {
  return (
    <svg
      className={twMerge(" h-3.5 w-3.5", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
      {...rest}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  );
}
