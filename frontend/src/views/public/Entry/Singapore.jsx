import axios from "axios";
import { Button } from "components/form/Button";
import { Group, Join } from "components/form/Group";
import { Input } from "components/form/Input";
import { Radio } from "components/form/Radio";
import { AsyncSelect, Select, SelectNotCreatable } from "components/form/Select";
import { StepIndicator } from "components/form/StepIndicator";
import { useAuth } from "hook/useAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useNavigate, useSearchParams } from "react-router-dom";
import countries from "../countries.json";
import districts from "../districts.json";
import occupationJSON from "../occupation.json";
import races from "../races.json";
import { AddIcon, DeleteIcon } from "./MainEntry";
import { NextIcon } from "./Schengen";
import { Spinner } from "./Spinner";
import { SEPARATOR } from "./Thailand";
import { fire, flattenObject, formatDateToYYYYMMDD, getExactOption, populate, setValue } from "./util";

const religionOptions = ["Islam", "Christianity", "Hinduism", "Buddhism", "Sikhism", "Spiritism", "Judaism"].map(
  (value) => ({
    label: value,
    value,
  })
);

const countriesOptions = countries.map((e) => ({
  label: e.name,
  value: e.nationality,
}));

const stateOfBirthOptions = districts.map((value) => ({
  label: value,
  value,
}));

const occupationOptions = occupationJSON.map((value) => ({
  label: value,
  value,
}));

const racesOptions = races.map((value) => ({
  label: value,
  value,
}));

const citizenshipOfSpouseOptions = ["Singapore Citizen", "Singapore Permanent Resident"].map((value) => ({
  label: value,
  value,
}));

const nationalityOptions = countries.map(({ nationality }) => ({
  label: nationality,
  value: nationality,
}));

const documentTypeOptions = [
  "International Passport",
  "Diplomatic Passport",
  "Official Passport",
  "Service Passport",
  "Document of Identity",
  "Certificate of Identity",
].map((value) => ({
  label: value,
  value,
}));

const maritalStatusOptions = ["Single", "Married", "Separated", "Divorced", "Widowed", "Cohabited", "Customary"].map(
  (value) => ({
    label: value,
    value,
  })
);

const sexesOptions = ["Male", "Female"].map((value) => ({
  label: value,
  value,
}));

const purposeOfVisitOptions = ["Social", "Business"].map((value) => ({
  label: value,
  value,
}));

const academicOptions = [
  "Post-Graduate",
  "Pre-University",
  "No Formal Education",
  "Primary",
  "Secondary",
  "Diploma",
  "University",
].map((value) => ({
  label: value,
  value,
}));

const typeOfVisaOptions = ["Single Journey", "Double Journey", "Triple Journey", "Multiple Journey"].map((value) => ({
  label: value,
  value,
}));

const stayLocationOptions = ["Hotel", "Next of Kin's Place", "Relative's Place", "Friend's Place"].map((value) => ({
  label: value,
  value,
}));

const streetNameOptions = [
  "V Hotel Bencoolen",
  "Mercure Singapore On Stevens",
  "Hotel Boss",
  "ibis budget Singapore Emerald",
  "Holiday Inn Express Singapore Clarke Quay, an IHG Hotel",
  "Pan Pacific Singapore",
  "PARKROYAL",
  "Mercure Singapore On Stevens",
  "The Sultan",
  "Novotel Singapore On Stevens",
].map((value) => ({
  label: value,
  value: value.toUpperCase(),
}));

const streetNameOptionsRelatedData = {
  "v hotel bencoolen": {
    houseNo: "48",
    streetName: "V Hotel Bencoolen",
    floor: "01",
    unit: "01",
    postalCode: "189627",
    buildingName: "Bencoolen St",
    contactNo: "+65 6388 2233",
  },
  "mercure singapore on stevens": {
    houseNo: "28",
    streetName: "Mercure Singapore On Stevens",
    floor: "01",
    unit: "02",
    postalCode: "257878",
    buildingName: "Stevens Rd, Orchard District",
    contactNo: "+65 6491 6100",
  },
  "hotel boss": {
    houseNo: "500",
    streetName: "Hotel Boss",
    floor: "01",
    unit: "01",
    postalCode: "199020",
    buildingName: "Jln Sultan",
    contactNo: "+65 6809 0000",
  },
  "ibis budget singapore emerald": {
    houseNo: "20",
    streetName: "ibis budget Singapore Emerald",
    postalCode: "399174",
    buildingName: "Lor 6 Geylang",
    contactNo: "+65 6842 3888",
  },
  "holiday inn express singapore clarke quay, an ihg hotel": {
    houseNo: "2",
    streetName: "Holiday Inn Express Singapore Clarke Quay, an IHG Hotel",
    postalCode: "059573",
    buildingName: "Magazine Rd",
    contactNo: "+65 6589 8000",
  },
  "pan pacific singapore": {
    houseNo: "7",
    streetName: "Pan Pacific Singapore",
    postalCode: "039595",
    buildingName: "Raffles Blvd",
    contactNo: "+65 6336 8111",
  },
  parkroyal: {
    houseNo: "181",
    streetName: "PARKROYAL",
    postalCode: "208533",
    buildingName: "Kitchener Rd",
    contactNo: "+65 6428 3000",
  },
  "the sultan": {
    houseNo: "101",
    streetName: "The Sultan",
    floor: "01",
    unit: "01",
    postalCode: "199002",
    buildingName: "Jln Sultan",
    contactNo: "+65 6723 7101",
  },
  "novotel singapore on stevens": {
    houseNo: "28",
    streetName: "Novotel Singapore On Stevens",
    postalCode: "257878",
    buildingName: "Stevens Rd, Orchard District",
    contactNo: "+65 6491 6100",
  },
};

const localCompanyOptions = ["Joy Travel & Tours Pte LT"].map((value) => ({
  label: value,
  value: value.toUpperCase(),
}));

const localCompanyOptionsRelatedData = {
  "joy travel & tours pte lt": {
    relationship: "CLIENT",
    contactNo: "6591381993",
    email: "JOYHOLIDAYS88@GMAIL.COM",
  },
};

const steps = ["", "", ""];

const localParticulars = "singapore-particulars-of-applicant";
const localOthers = "singapore-other-details";
const localLocal = "singapore-particulars-of-local-contact";

function clearLocalStore() {
  localStorage.removeItem(localParticulars);
  localStorage.removeItem(localOthers);
  localStorage.removeItem(localLocal);
}

export function Singapore() {
  const navigate = useNavigate();
  const [url] = useSearchParams();
  const [step, setStep] = useState(1);
  const [_, setForm] = useState({});
  const [livedOtherCountries, setLivedOtherCountries] = useState([]);

  useAuth();

  const particularsOfApplicant = useForm();
  const otherDetails = useForm();
  const countryForm = useForm();
  const particularsOfLocalContact = useForm();

  const number = particularsOfApplicant.watch("passport-no") || {};

  const dateOfIssue = particularsOfApplicant.watch("passport-issue-date");
  const streetName = otherDetails.watch("singapore-street-name");
  const localContact = particularsOfLocalContact.watch("name-of-local-contact");
  const citizenshipOfSpouse = particularsOfApplicant.watch("citizenship-of-spouse");
  const answers = particularsOfLocalContact.watch(["a", "b", "c", "d"]);

  const isStayingMoreThanThirtyDays = otherDetails.watch("days-intend-to-stay") === "More than 30 days";
  const isLivedOtherCountry = otherDetails.watch("lived-other-country") === "Yes";
  const isExtraInformationRequired = answers.includes("Yes");
  const isSpouseIsSingaporeCitizen = citizenshipOfSpouseOptions.some(
    (c) => citizenshipOfSpouse && c.value === citizenshipOfSpouse.value
  );

  useFormPersist(localParticulars, {
    watch: particularsOfApplicant.watch,
    setValue: particularsOfApplicant.setValue,
    storage: window.localStorage,
  });

  useFormPersist(localOthers, {
    watch: otherDetails.watch,
    setValue: otherDetails.setValue,
    storage: window.localStorage,
  });

  useFormPersist(localLocal, {
    watch: particularsOfLocalContact.watch,
    setValue: particularsOfLocalContact.setValue,
    storage: window.localStorage,
  });

  useEffect(() => {
    otherDetails.setValue("religion", religionOptions[0]);
    particularsOfApplicant.setValue("country-of-birth", countriesOptions[0]);
    particularsOfApplicant.setValue("state-of-birth", stateOfBirthOptions[0]);
    particularsOfApplicant.setValue("nationality", nationalityOptions[0]);
    particularsOfApplicant.setValue("race", racesOptions[0]);
    particularsOfApplicant.setValue("type-of-passport", documentTypeOptions[0]);
    particularsOfApplicant.setValue("residence", countriesOptions[0]);
    particularsOfApplicant.setValue("state-of-residence", stateOfBirthOptions[0]);
    particularsOfApplicant.setValue("citizenship-of-spouse", { label: "Bangladesh", value: "Bangladesh" });
    particularsOfApplicant.setValue("country-of-issue", "Dhaka, Bangladesh");
    particularsOfLocalContact.setValue("name-of-local-contact", localCompanyOptions[0]);

    otherDetails.setValue("occupation", occupationOptions[0]);
    otherDetails.setValue("highest-academic", academicOptions[0]);
    otherDetails.setValue("type-of-visa", typeOfVisaOptions[1]);
    otherDetails.setValue("purpose-of-visit", purposeOfVisitOptions[0]);
    otherDetails.setValue("details-of-purpose", "TOURISM");
    otherDetails.setValue("stay-location", stayLocationOptions[0]);

    otherDetails.setValue("singapore-street-name", streetNameOptions[0]);
    otherDetails.setValue("singapore-floor-no", "01");
    otherDetails.setValue("singapore-unit-no", "01");
  }, []);

  useEffect(() => {
    if (streetName?.value && streetName.value.toLowerCase() in streetNameOptionsRelatedData) {
      const more = streetNameOptionsRelatedData[streetName.value.toLowerCase()];

      otherDetails.setValue("singapore-house-no", more.houseNo);

      more.floor && otherDetails.setValue("singapore-floor-no", more.floor);
      more.unit && otherDetails.setValue("singapore-unit-no", more.unit);
      otherDetails.setValue("singapore-postal-code", more.postalCode);
      otherDetails.setValue("singapore-contact-no", more.contactNo);
      otherDetails.setValue("singapore-building-name", more.buildingName);
    }
  }, [streetName?.value]);

  useEffect(() => {
    if (localContact?.value && localContact.value.toLowerCase() in localCompanyOptionsRelatedData) {
      const more = localCompanyOptionsRelatedData[localContact.value.toLowerCase()];
      particularsOfLocalContact.setValue("relationship-of-local-contact", more.relationship);
      particularsOfLocalContact.setValue("contact-no-of-local-contact", more.contactNo);
      particularsOfLocalContact.setValue("email-of-local-contact", more.email);
    }
  }, [localContact?.value]);

  useEffect(() => {
    if (dateOfIssue && !particularsOfApplicant.getValues("passport-expiry-date")) {
      const issue = new Date(dateOfIssue);
      issue.setFullYear(issue.getFullYear() + 10);
      issue.setDate(issue.getDate() - 1);

      particularsOfApplicant.setValue("passport-expiry-date", formatDateToYYYYMMDD(issue));
    }
  }, [dateOfIssue]);

  function particularsOfApplicantSubmit(data) {
    setForm((prev) => Object.assign(prev, flattenObject(data)));
    setStep(2);
  }

  function otherDetailsSubmit(data) {
    if (isLivedOtherCountry && livedOtherCountries.length < 1) {
      otherDetails.setError("lived-other-country", { type: "required", message: "Add Country or Select No" });
      return countryForm.setFocus("country");
    }

    setForm((prev) => Object.assign(prev, flattenObject(data), { "lived-other-countries": livedOtherCountries }));
    setStep(3);
  }

  function submitCountryForm({ from, to, country, address }) {
    setLivedOtherCountries([...livedOtherCountries, { from, to, address, country: country.value }]);
    countryForm.reset({ country: null, from: "", to: "", address: "" });
  }

  async function particularsOfLocalContactSubmit(__d) {
    const data = flattenObject(Object.assign(_, Object.assign(__d, { reference: url.get("ref") })));
    setForm(data);

    const serverRes = await axios.post("/api/visa-form/singapore", data).catch(console.log);
    if (!serverRes) return fire();
    fire("Successfully Done!", "success");

    setTimeout(clearLocalStore, 500);
    navigate(-1);
  }

  function stopSubmitting(event) {
    if (event.key === "Enter") event.preventDefault();
  }

  useEffect(() => {
    if (number.__isNew__ || !number.value) return;

    populate(number.value, (_value) => {
      const db = Object.assign(_value.common, _value.singapore);
      if (!db) return;

      const setStepOne = particularsOfApplicant.setValue;
      const setStepTwo = otherDetails.setValue;

      setValue(db["name"], (_v) => setStepOne("name", _v));
      setValue(db["alias"], (_v) => setStepOne("alias", _v));
      setValue(db["date_of_birth"], (_v) => setStepOne("date-of-birth", _v));
      setValue(getExactOption(sexesOptions, db["sex"]), (_v) => setStepOne("sex", _v), true);
      setValue(
        getExactOption(maritalStatusOptions, db["marital_status"]),
        (_v) => setStepOne("marital-status", _v),
        true
      );
      setValue(db["nationality"], (_v) => setStepOne("nationality", _v), true);
      setValue(db["citizenship"], (_v) => setStepOne("citizenship-of-spouse", _v), true);
      setValue(db["nric"], (_v) => setStepOne("nric-no", _v));
      setValue(db["country_place_of_birth"], (_v) => setStepOne("country-of-birth", _v), true);
      setValue(db["state_place_of_birth"], (_v) => setStepOne("state-of-birth", _v), true);
      setValue(db["race"], (_v) => setStepOne("race", _v), true);
      setValue(db["type_of_passport"], (_v) => setStepOne("type-of-passport", _v), true);
      setValue(db["passport_issue_date"], (_v) => setStepOne("passport-issue-date", _v));
      setValue(db["passport_expire_date"], (_v) => setStepOne("passport-expiry-date", _v));
      setValue(db["passport_issue_country"], (_v) => setStepOne("country-of-issue", _v));
      setValue(db["prc_id_number"], (_v) => setStepOne("prc-id-number", _v));
      setValue(db["residence_country"], (_v) => setStepOne("residence", _v), true);
      setValue(db["residence_state"], (_v) => setStepOne("state-of-residence", _v), true);
      setValue(db["residence_origin"], (_v) => setStepOne("prefecture-of-residence", _v));
      setValue(db["residence_address"], (_v) => setStepOne("address", _v));

      setValue(db["email"], (_v) => setStepTwo("email-address", _v));
      setValue(db["contact_number"], (_v) => setStepTwo("contact-number", _v));

      if (db["occupation"]?.includes(SEPARATOR)) {
        setValue(db["occupation"].split(SEPARATOR)[0], (_v) => setStepTwo("occupation", _v), true);
      } else {
        setValue(db["occupation"], (_v) => setStepTwo("occupation", _v), true);
      }

      setValue(db["high_academic"], (_v) => setStepTwo("highest-academic", _v), true);
      setValue(db["qualifications_attained"], (_v) => setStepTwo("qualifications-attained", _v), true);
      setValue(db["annual_income"], (_v) => setStepTwo("annual-income", _v));
      setValue(db["religion"], (_v) => setStepTwo("religion", _v), true);
      setValue(db["type_of_visa"], (_v) => setStepTwo("type-of-visa", _v), true);
    });
  }, [number.value]);

  return (
    <main className="container mx-auto space-y-4 p-4">
      <button
        onClick={() => {
          navigate(-1);
          setTimeout(clearLocalStore, 500);
        }}
        disabled={
          particularsOfApplicant.formState.isSubmitting ||
          otherDetails.formState.isSubmitting ||
          countryForm.formState.isSubmitting ||
          particularsOfLocalContact.formState.isSubmitting
        }
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
            name="particulars_of_applicant"
            className="space-y-4"
            onSubmit={particularsOfApplicant.handleSubmit(particularsOfApplicantSubmit)}
            autoComplete="off"
          >
            <fieldset
              disabled={particularsOfApplicant.formState.isSubmitting}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AsyncSelect
                label="Passport Number *"
                placeholder="Select passport number"
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                name="passport-no"
                register={particularsOfApplicant.register("passport-no", { required: "Passport number is required" })}
                error={particularsOfApplicant.formState.errors["passport-no"]}
              />

              <Input
                label="Name (Full Name As Shown In Travel Document) *"
                placeholder="Name"
                register={particularsOfApplicant.register("name", {
                  required: "Name is required",
                  maxLength: { value: 50, message: "Exceeds 50 character limit" },
                })}
                error={particularsOfApplicant.formState.errors["name"]}
              />

              <Input
                label="Alias"
                register={particularsOfApplicant.register("alias", {
                  maxLength: { value: 50, message: "Exceeds 50 character limit" },
                })}
                error={particularsOfApplicant.formState.errors["alias"]}
              />

              <Input
                label="Date Of Birth *"
                register={particularsOfApplicant.register("date-of-birth", {
                  required: "Birth date is required",
                  max: { value: new Date().toISOString().split("T")[0], message: "Birth date cannot be future date" },
                })}
                error={particularsOfApplicant.formState.errors["date-of-birth"]}
                type="date"
              />

              <SelectNotCreatable
                label="Sex (Gender) *"
                options={sexesOptions}
                placeholder="Select your gender"
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                name="sex"
                isSearchable={false}
                register={particularsOfApplicant.register("sex", { required: "Sex (gender) is required" })}
                error={particularsOfApplicant.formState.errors["sex"]}
              />

              <SelectNotCreatable
                label="Marital Status *"
                options={maritalStatusOptions}
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                name="marital-status"
                placeholder="Select marital status"
                isSearchable={false}
                register={particularsOfApplicant.register("marital-status", { required: "Marital status is required" })}
                error={particularsOfApplicant.formState.errors["marital-status"]}
              />

              <Select
                label="Nationality/Citizenship Of Spouse *"
                placeholder="Select ationality/citizenship"
                name="citizenship-of-spouse"
                options={citizenshipOfSpouseOptions}
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                register={particularsOfApplicant.register("citizenship-of-spouse", {
                  required: "Citizenship of Spouse is required",
                })}
                error={particularsOfApplicant.formState.errors["citizenship-of-spouse"]}
              />

              {isSpouseIsSingaporeCitizen && (
                <Input
                  label="NRIC No *"
                  register={particularsOfApplicant.register("nric-no", {
                    required: { value: isSpouseIsSingaporeCitizen, message: "NRIC No is required" },
                    maxLength: { value: 9, message: "Exceeds 9 character limit" },
                  })}
                  error={particularsOfApplicant.formState.errors["nric-no"]}
                />
              )}

              <Select
                label="Country/Place Of Birth *"
                options={countriesOptions}
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                placeholder="Select country of birth"
                name="country-of-birth"
                register={particularsOfApplicant.register("country-of-birth", {
                  required: "Country/place of birth is required",
                })}
                error={particularsOfApplicant.formState.errors["country-of-birth"]}
              />

              <Select
                label="State/Province Of Birth *"
                options={stateOfBirthOptions}
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                placeholder="Select state of birth"
                name="state-of-birth"
                register={particularsOfApplicant.register("state-of-birth", {
                  required: "State/province of birth is required",
                })}
                error={particularsOfApplicant.formState.errors["state-of-birth"]}
              />

              <Select
                label="Race: (example - Malay, Indian, etc) *"
                options={racesOptions}
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                name="race"
                placeholder="Select race"
                register={particularsOfApplicant.register("race", { required: "Race is required" })}
                error={particularsOfApplicant.formState.errors["race"]}
              />

              <Select
                label="Nationality/Citizenship *"
                placeholder="Select nationality/citizenship"
                options={nationalityOptions}
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                name="nationality"
                register={particularsOfApplicant.register("nationality", {
                  required: "Nationality/Citizenship is required",
                })}
                error={particularsOfApplicant.formState.errors["nationality"]}
              />

              <Select
                label="Type Of Passport *"
                placeholder="Select passport type"
                options={documentTypeOptions}
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                name="type-of-passport"
                register={particularsOfApplicant.register("type-of-passport", {
                  required: "Type of passport is required",
                })}
                error={particularsOfApplicant.formState.errors["type-of-passport"]}
              />

              <Input
                label="Passport Issue Date *"
                register={particularsOfApplicant.register("passport-issue-date", {
                  required: "Passport issue date no is required",
                })}
                error={particularsOfApplicant.formState.errors["passport-issue-date"]}
                type="date"
              />

              <Input
                label="Passport Expiry Date *"
                register={particularsOfApplicant.register("passport-expiry-date", {
                  required: "Passport expiry date no is required",
                })}
                error={particularsOfApplicant.formState.errors["passport-expiry-date"]}
                type="date"
              />

              <Input
                label="Place/Country Of Issue *"
                placeholder="State, Country"
                register={particularsOfApplicant.register("country-of-issue", {
                  required: "Place/Country of Issue is required",
                  maxLength: {
                    value: 25,
                    message: "Exceeds 25 character limit",
                  },
                })}
                error={particularsOfApplicant.formState.errors["country-of-issue"]}
              />

              <Input
                label="PRC ID Number (For Chinese Nationals Only)"
                placeholder="PRC ID Number"
                register={particularsOfApplicant.register("prc-id-number", {
                  maxLength: {
                    value: 20,
                    message: "Exceeds 20 character limit",
                  },
                })}
                error={particularsOfApplicant.formState.errors["prc-id-number"]}
              />

              <Select
                label="Country/Place Of Origin/Residence *"
                placeholder="Select country"
                options={countriesOptions}
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                name="residence"
                register={particularsOfApplicant.register("residence", {
                  required: "Country/Place of Origin/Residence is required",
                })}
                error={particularsOfApplicant.formState.errors["residence"]}
              />

              <Select
                label="Division/State Of Origin/Residence *"
                placeholder="Select state"
                options={stateOfBirthOptions}
                control={particularsOfApplicant.control}
                isDisabled={particularsOfApplicant.formState.isSubmitting}
                name="state-of-residence"
                register={particularsOfApplicant.register("state-of-residence", {
                  required: "Division/State of Origin/Residence is required",
                })}
                error={particularsOfApplicant.formState.errors["state-of-residence"]}
              />

              <Input
                label="Prefecture Of Origin/Residence"
                register={particularsOfApplicant.register("prefecture-of-residence", {
                  maxLength: {
                    value: 25,
                    message: "Exceeds 25 character limit",
                  },
                })}
                error={particularsOfApplicant.formState.errors["prefecture-of-residence"]}
              />

              <Input
                label="Address *"
                register={particularsOfApplicant.register("address", {
                  required: "Address is required",
                })}
                error={particularsOfApplicant.formState.errors["address"]}
              />
            </fieldset>

            <div className="flex justify-end">
              <Button disabled={particularsOfApplicant.formState.isSubmitting} className="disabled:cursor-pointer">
                Next
                {particularsOfApplicant.formState.isSubmitting ? (
                  <Spinner className="ml-2" />
                ) : (
                  <NextIcon className="ml-2" />
                )}
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form
            name="other_details"
            className="space-y-4"
            onSubmit={otherDetails.handleSubmit(otherDetailsSubmit)}
            autoComplete="off"
          >
            <fieldset
              disabled={otherDetails.formState.isSubmitting}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <Input
                label="Email Address *"
                register={otherDetails.register("email-address", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/,
                    message: "Email is not valid",
                  },
                  maxLength: {
                    value: 25,
                    message: "Exceeds 25 character limit",
                  },
                })}
                error={otherDetails.formState.errors["email-address"]}
              />

              <Input
                label="Contact Number *"
                register={otherDetails.register("contact-number", {
                  required: "Contact number is required",
                  pattern: { value: /^(\+\d{1,})?(\d+)$/, message: "Contact number is not valid" },
                  maxLength: { value: 25, message: "Exceeds 25 character limit" },
                })}
                error={otherDetails.formState.errors["contact-number"]}
              />

              <Select
                label="Occupation *"
                placeholder="Select occupation"
                control={otherDetails.control}
                options={occupationOptions}
                name="occupation"
                register={otherDetails.register("occupation", {
                  required: "Occupation is required",
                  maxLength: { value: 25, message: "Exceeds 25 character limit" },
                })}
                error={otherDetails.formState.errors["occupation"]}
              />

              <SelectNotCreatable
                label="Highest Academic/Professional *"
                options={academicOptions}
                control={otherDetails.control}
                isDisabled={otherDetails.formState.isSubmitting}
                name="highest-academic"
                placeholder="Select Highest Academic"
                isSearchable={false}
                register={otherDetails.register("highest-academic", {
                  required: "Highest Academic/Professional is required",
                })}
                error={otherDetails.formState.errors["highest-academic"]}
              />

              <Input
                label="Annual Income In Singapore Dollars (SGD) *"
                register={otherDetails.register("annual-income", {
                  required: "Annual Income is required",
                  pattern: { value: /^\d+$/, message: "Annual Income is not valid (only number)" },
                  maxLength: { value: 11, message: "Exceeds 11 character limit" },
                })}
                error={otherDetails.formState.errors["annual-income"]}
              />

              <Select
                label="Religion *"
                control={otherDetails.control}
                placeholder="Select religion"
                options={religionOptions}
                isDisabled={otherDetails.formState.isSubmitting}
                name="religion"
                register={otherDetails.register("religion", {
                  required: "Religion is required",
                })}
                error={otherDetails.formState.errors["religion"]}
              />

              <Input
                label="Expected Date Of Arrival In Singapore *"
                register={otherDetails.register("arrival-date", {
                  required: "Date of Arrival in Singapore is required",
                })}
                error={otherDetails.formState.errors["arrival-date"]}
                type="date"
              />

              <SelectNotCreatable
                label="Type Of Visa *"
                options={typeOfVisaOptions}
                control={otherDetails.control}
                isDisabled={otherDetails.formState.isSubmitting}
                name="type-of-visa"
                placeholder="Select type of Visa"
                isSearchable={false}
                register={otherDetails.register("type-of-visa", {
                  required: "Type of visa is required",
                })}
                error={otherDetails.formState.errors["type-of-visa"]}
              />

              <SelectNotCreatable
                label="Purpose Of Visit *"
                options={purposeOfVisitOptions}
                control={otherDetails.control}
                isDisabled={otherDetails.formState.isSubmitting}
                name="purpose-of-visit"
                placeholder="Select purpose of visit"
                isSearchable={false}
                register={otherDetails.register("purpose-of-visit", {
                  required: "Purpose of visit is required",
                })}
                error={otherDetails.formState.errors["purpose-of-visit"]}
              />

              <Input
                label="Details Of Purpose"
                register={otherDetails.register("details-of-purpose")}
                error={otherDetails.formState.errors["details-of-purpose"]}
              />

              <div className="sm:col-span-2">
                <Select
                  label="Where Will You Be Staying In Singapore? *"
                  placeholder="Select location"
                  name="stay-location"
                  options={stayLocationOptions}
                  control={otherDetails.control}
                  isDisabled={otherDetails.formState.isSubmitting}
                  register={otherDetails.register("stay-location", {
                    required: "Stay location is required",
                  })}
                  error={otherDetails.formState.errors["stay-location"]}
                />
              </div>

              <Group
                options={["Less than 30 days", "More than 30 days"]}
                legend="How Long Do You Intend To Stay In Singapore *"
                classNameContainer="col-span-full"
                checked={isStayingMoreThanThirtyDays ? 2 : 1}
                register={otherDetails.register("days-intend-to-stay", { required: "Answer the question" })}
                error={otherDetails.formState.errors["days-intend-to-stay"]}
                isOpen={isStayingMoreThanThirtyDays}
                disabled={otherDetails.formState.isSubmitting}
              >
                <Input
                  label="If Your Intended Stay In Singapore Is More Than 30 Days, Please State The Reason For Your Intended Length Of Stay And The Duration"
                  classNameLabel="line-clamp-none"
                  placeholder="Describe why ..."
                  register={otherDetails.register("reason-for-stay")}
                  error={otherDetails.formState.errors["reason-for-stay"]}
                />
              </Group>

              <Join
                legend="Address In Singapore"
                classNameContainer="col-span-full"
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:flex xl:flex-wrap xl:[&>*]:flex-1"
              >
                <div className="col-span-full md:col-span-2">
                  <Select
                    label="Street Name *"
                    placeholder="Select street name"
                    name="singapore-street-name"
                    options={streetNameOptions}
                    control={otherDetails.control}
                    register={otherDetails.register("singapore-street-name", {
                      required: "Street name is required",
                    })}
                    error={otherDetails.formState.errors["singapore-street-name"]}
                  />
                </div>
                <Input
                  label="Block/House No *"
                  register={otherDetails.register("singapore-house-no", {
                    required: "Block/House no is required",
                    maxLength: { value: 5, message: "Exceeds 5 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-house-no"]}
                />

                <Input
                  label="Floor No *"
                  register={otherDetails.register("singapore-floor-no", {
                    required: "Floor no is required",
                    maxLength: { value: 2, message: "Exceeds 2 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-floor-no"]}
                />

                <Input
                  label="Unit No *"
                  register={otherDetails.register("singapore-unit-no", {
                    required: "Unit no is required",
                    maxLength: { value: 4, message: "Exceeds 4 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-unit-no"]}
                />

                <Input
                  label="Postal Code *"
                  register={otherDetails.register("singapore-postal-code", {
                    required: "Postal code is required",
                    maxLength: { value: 6, message: "Exceeds 4 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-postal-code"]}
                />
                <Input
                  label="Contact No *"
                  register={otherDetails.register("singapore-contact-no", {
                    required: "Contact no is required",
                    maxLength: { value: 20, message: "Exceeds 20 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-contact-no"]}
                />

                <Input
                  label="Building Name *"
                  register={otherDetails.register("singapore-building-name", {
                    required: "Building name is required",
                  })}
                  error={otherDetails.formState.errors["singapore-building-name"]}
                />
              </Join>

              <Group
                options={["No", "Yes"]}
                legend="Did you Reside in other Countries/Places, other than your Country/Place of Origin, for one year or more during the last 5 years? *"
                classNameContainer="col-span-full"
                checked={isLivedOtherCountry ? 2 : 1}
                register={otherDetails.register("lived-other-country", { required: "Answer the question" })}
                error={otherDetails.formState.errors["lived-other-country"]}
                isOpen={isLivedOtherCountry}
                className="flex flex-col gap-4"
                disabled={otherDetails.formState.isSubmitting}
              >
                {livedOtherCountries.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {livedOtherCountries.map((c) => (
                      <div className="grid grid-cols-[1fr_auto]" key={JSON.stringify(c)}>
                        <p>{c.country}</p>
                        <button
                          type="button"
                          className="mx-8"
                          onClick={() => setLivedOtherCountries((prev) => prev.filter((v) => c.country !== v.country))}
                        >
                          <DeleteIcon className="text-lg text-red-500/90 hover:text-red-600/90" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2 xl:flex xl:[&>*]:flex-1">
                  <Select
                    label="Country/Place *"
                    name="country"
                    options={countriesOptions}
                    placeholder="Select country"
                    register={countryForm.register("country", {
                      required: "Country/Place is required",
                      validate(v) {
                        if (
                          livedOtherCountries.findIndex((l) => l.country.toLowerCase() === v?.value.toLowerCase()) !==
                          -1
                        )
                          return `${v?.value.toLowerCase()} already added`;
                      },
                    })}
                    control={countryForm.control}
                    error={countryForm.formState.errors["country"]}
                    isDisabled={otherDetails.formState.isSubmitting || countryForm.formState.isSubmitting}
                  />

                  <Input
                    label="Address *"
                    onKeyDown={stopSubmitting}
                    register={countryForm.register("address", {
                      required: "Address is required",
                    })}
                    error={countryForm.formState.errors["address"]}
                  />

                  <Input
                    label="From *"
                    onKeyDown={stopSubmitting}
                    register={countryForm.register("from", {
                      required: "From is required",
                    })}
                    error={countryForm.formState.errors["from"]}
                    type="date"
                  />
                  <Input
                    label="To *"
                    onKeyDown={stopSubmitting}
                    register={countryForm.register("to", {
                      required: "To is required",
                    })}
                    error={countryForm.formState.errors["to"]}
                    type="date"
                  />
                </div>

                <button
                  className="mr-auto box-border inline-flex items-center rounded border border-brand-100 bg-gray-50 px-5 py-2 text-center text-sm font-medium text-blue-700 shadow transition-all hover:border-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-50"
                  onClick={countryForm.handleSubmit(submitCountryForm)}
                  type="button"
                  disabled={otherDetails.formState.isSubmitting || countryForm.formState.isSubmitting}
                >
                  Add <AddIcon className="ml-1 text-lg " />
                </button>
              </Group>

              <Join
                legend="Details of Travelling Companion (Only for applicant who is 12 years old or less at the point of application. Details are not required if applicant is accompanied by an airline representative.)"
                classNameContainer="col-span-full"
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
              >
                <Input
                  label="Relationship Of Travelling Companion To Applicant"
                  register={otherDetails.register("relationship-of-travelling-companion", {
                    maxLength: { value: 25, message: "Exceeds 25 character limit" },
                  })}
                  error={otherDetails.formState.errors["relationship-of-travelling-companion"]}
                />

                <Input
                  label="Name"
                  register={otherDetails.register("name-of-travelling-companion", {
                    maxLength: { value: 50, message: "Exceeds 50 character limit" },
                  })}
                  error={otherDetails.formState.errors["name-of-travelling-companion"]}
                />

                <Input
                  label="Date Of Birth"
                  register={otherDetails.register("birth-date-of-travelling-companion")}
                  error={otherDetails.formState.errors["birth-date-of-travelling-companion"]}
                  type="date"
                />

                <SelectNotCreatable
                  label="Sex (Gender)"
                  options={sexesOptions}
                  isDisabled={otherDetails.formState.isSubmitting}
                  placeholder="Select gender"
                  control={otherDetails.control}
                  isClearable
                  name="sex-of-travelling-companion"
                  isSearchable={false}
                  register={otherDetails.register("sex-of-travelling-companion")}
                  error={otherDetails.formState.errors["sex-of-travelling-companion"]}
                />

                <Select
                  label="Nationality/Citizenship "
                  placeholder="Select nationality/citizenship"
                  options={nationalityOptions}
                  control={otherDetails.control}
                  isDisabled={otherDetails.formState.isSubmitting}
                  isClearable
                  name="nationality-of-travelling-companion"
                  register={otherDetails.register("nationality-of-travelling-companion")}
                  error={otherDetails.formState.errors["nationality-of-travelling-companion"]}
                />

                <Input
                  label="Passport No"
                  register={otherDetails.register("passport-no-of-travelling-companion", {
                    maxLength: { value: 15, message: "Exceeds 15 character limit" },
                  })}
                  error={otherDetails.formState.errors["passport-no-of-travelling-companion"]}
                />
              </Join>
            </fieldset>

            <div className="flex justify-between">
              <Button
                disabled={otherDetails.formState.isSubmitting}
                className="disabled:opacity-0"
                type="button"
                onClick={() => setStep(1)}
              >
                <NextIcon className="mr-2 scale-x-[-1] cursor-none" /> Previous
              </Button>
              <Button disabled={otherDetails.formState.isSubmitting} className="disabled:cursor-pointer">
                Next
                {otherDetails.formState.isSubmitting ? <Spinner className="ml-2" /> : <NextIcon className="ml-2" />}
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form
            name="particulars_of_local_contact"
            className="space-y-4"
            onSubmit={particularsOfLocalContact.handleSubmit(particularsOfLocalContactSubmit)}
            autoComplete="off"
          >
            <fieldset disabled={particularsOfLocalContact.formState.isSubmitting} className="grid gap-4 md:grid-cols-2">
              <Select
                label="Name Of Local Contact Company/Hotel *"
                placeholder="Select company/hotel"
                options={localCompanyOptions}
                name="name-of-local-contact"
                control={particularsOfLocalContact.control}
                register={particularsOfLocalContact.register("name-of-local-contact", {
                  required: "Name of local contact company/hotel is required",
                })}
                error={particularsOfLocalContact.formState.errors["name-of-local-contact"]}
              />

              <Input
                label="Relationship of local contact/company/hotel to applicant *"
                register={particularsOfLocalContact.register("relationship-of-local-contact", {
                  required: "Relationship of local contact to applicant is required",
                  maxLength: {
                    value: 25,
                    message: "Exceeds 25 character limit",
                  },
                })}
                error={particularsOfLocalContact.formState.errors["relationship-of-local-contact"]}
              />

              <Input
                label="Contact No *"
                register={particularsOfLocalContact.register("contact-no-of-local-contact", {
                  required: "Contact no is required",
                })}
                error={particularsOfLocalContact.formState.errors["contact-no-of-local-contact"]}
              />

              <Input
                label="Email Address *"
                register={particularsOfLocalContact.register("email-of-local-contact", {
                  required: "Email address is required",
                })}
                error={particularsOfLocalContact.formState.errors["email-of-local-contact"]}
              />

              <Join legend="Antecedent Of Applicant" classNameContainer="col-span-full" className="flex flex-col gap-4">
                <Radio
                  label="Have You Ever Been Refused Entry Into Or Deported From Any Country/Place, Including Singapore?"
                  options={["No", "Yes"]}
                  checked={1}
                  error={particularsOfLocalContact.formState.errors["a"]}
                  register={particularsOfLocalContact.register("a", {
                    required: "Answer the question",
                  })}
                  classNameLabel="line-clamp-none"
                  disabled={particularsOfLocalContact.formState.isSubmitting}
                />

                <Radio
                  label="Have You Ever Been Convicted In A Court Of Law In Any Country/Place, Including Singapore?"
                  options={["No", "Yes"]}
                  checked={1}
                  error={particularsOfLocalContact.formState.errors["b"]}
                  register={particularsOfLocalContact.register("b", {
                    required: "Answer the question",
                  })}
                  classNameLabel="line-clamp-none"
                  disabled={particularsOfLocalContact.formState.isSubmitting}
                />

                <Radio
                  label="Have You Ever Been Prohibited From Entering Singapore?"
                  options={["No", "Yes"]}
                  checked={1}
                  error={particularsOfLocalContact.formState.errors["c"]}
                  register={particularsOfLocalContact.register("c", {
                    required: "Answer the question",
                  })}
                  classNameLabel="line-clamp-none"
                  disabled={particularsOfLocalContact.formState.isSubmitting}
                />

                <Radio
                  label="Have You Ever Entered Singapore Using A Different Passport Or Name?"
                  options={["No", "Yes"]}
                  checked={1}
                  error={particularsOfLocalContact.formState.errors["d"]}
                  register={particularsOfLocalContact.register("d", {
                    required: "Answer the question",
                  })}
                  classNameLabel="line-clamp-none"
                  disabled={particularsOfLocalContact.formState.isSubmitting}
                />

                {isExtraInformationRequired && (
                  <Input
                    label={`If any of the answer is "Yes", please furnish details below *`}
                    register={particularsOfLocalContact.register("details-why-yes", {
                      required: { value: isExtraInformationRequired, message: "Details is required" },
                    })}
                    error={particularsOfLocalContact.formState.errors["details-why-yes"]}
                  />
                )}
              </Join>
            </fieldset>

            <div className="flex justify-between">
              <Button
                disabled={particularsOfLocalContact.formState.isSubmitting}
                className="disabled:opacity-0"
                type="button"
                onClick={() => setStep(2)}
              >
                <NextIcon className="mr-2 scale-x-[-1] cursor-none" /> Previous
              </Button>
              <Button disabled={particularsOfLocalContact.formState.isSubmitting} className="disabled:cursor-pointer">
                Submit
                {particularsOfLocalContact.formState.isSubmitting ? (
                  <Spinner className="ml-2" />
                ) : (
                  <NextIcon className="ml-2" />
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
