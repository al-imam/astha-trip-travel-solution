import axios from "axios";
import { Button } from "components/form/Button";
import { Group, Join } from "components/form/Group";
import { Input } from "components/form/Input";
import { Select, SelectNotCreatable } from "components/form/Select";
import { StepIndicator } from "components/form/StepIndicator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import countries from "../countries.json";
import districts from "../districts.json";
import { fire, flattenObject } from "./util";
import { Spinner } from "./Spinner";

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

export function Schengen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});

  const personal = useForm();
  const travel = useForm();
  const contact = useForm();
  const info = useForm();

  const isResidence = contact.watch("residence-in-a-country") === "Yes";
  const isEuCitizen = travel.watch("have-eu-citizen") === "Yes";
  const isFingerprintsCollectedPreviously = info.watch("fingerprints-collected-previously") === "Yes";

  const cleanPersonal = useFormPersist("schengen-personal-submit", {
    watch: personal.watch,
    setValue: personal.setValue,
    storage: window.sessionStorage,
  });

  const cleanTravel = useFormPersist("schengen-travel-submit", {
    watch: travel.watch,
    setValue: travel.setValue,
    storage: window.sessionStorage,
  });

  const cleanContact = useFormPersist("schengen-contact-submit", {
    watch: contact.watch,
    setValue: contact.setValue,
    storage: window.sessionStorage,
  });

  const cleanInfo = useFormPersist("schengen-info-submit", {
    watch: info.watch,
    setValue: info.setValue,
    storage: window.sessionStorage,
  });

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
    await new Promise((r) => setTimeout(r, 500));
    const data = flattenObject(Object.assign(form, __d));
    setForm(data);

    const serverRes = await axios.post("/api/visa-form/schengen", data).catch(console.log);
    if (!serverRes) return fire();

    fire("Successfully Done!", "success");

    cleanContact.clear();
    cleanTravel.clear();
    cleanInfo.clear();
    cleanContact.clear();
  }

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
              <Select
                label="Passport number *"
                placeholder="Select passport number"
                options={[]}
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
                label="Surname at birth"
                register={personal.register("surname-at-birth")}
                error={personal.formState.errors["surname-at-birth"]}
              />

              <Input
                label="Fist name *"
                placeholder="Fist name"
                register={personal.register("first-name", { required: "Fist name is required" })}
                error={personal.formState.errors["first-name"]}
              />

              <Input
                label="Date of birth *"
                placeholder="Date of birth"
                register={personal.register("date-of-birth", {
                  required: "Birth date is required",
                  max: { value: new Date().toISOString().split("T")[0], message: "Birth date cannot be future date" },
                })}
                error={personal.formState.errors["date-of-birth"]}
                type="date"
              />

              <Select
                label="Place of birth *"
                placeholder="Select place of birth"
                name="place-of-birth"
                options={placeOfBirthOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                register={personal.register("place-of-birth", { required: "Place of birth is required" })}
                error={personal.formState.errors["place-of-birth"]}
              />

              <Select
                label="Country of birth *"
                options={countriesOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                placeholder="Select country of birth"
                name="country-of-birth"
                register={personal.register("country-of-birth", { required: "Country of birth is required" })}
                error={personal.formState.errors["country-of-birth"]}
              />

              <Select
                label="Current nationality *"
                options={nationalityOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="current-nationality"
                placeholder="Select current nationality"
                register={personal.register("current-nationality", { required: "Current nationality is required" })}
                error={personal.formState.errors["current-nationality"]}
              />

              <Select
                label="Nationality at birth, if different"
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
                label="Other nationalities, if you have"
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
                label="Sex (gender) *"
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
                label="Civil status *"
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
                  label="Parental authority (in case of minors) /legal guardian (surname, first name, address, if different from applicant's, telephone no., e-mail address, and nationality)"
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
                label="National identity number *"
                placeholder="National identity number"
                register={travel.register("national-identity-number", {
                  required: "National identity number is required",
                })}
                error={travel.formState.errors["national-identity-number"]}
              />

              <Select
                label="Type of travel document *"
                options={documentTypeOptions}
                control={travel.control}
                isDisabled={travel.formState.isSubmitting}
                placeholder="Select passport type"
                name="travel-document-type"
                register={travel.register("travel-document-type", { required: "Travel document type is required" })}
                error={travel.formState.errors["travel-document-type"]}
              />

              <Input
                label="Date of issue *"
                register={travel.register("date-of-issue", {
                  required: "Issue date is required",
                })}
                error={travel.formState.errors["date-of-issue"]}
                type="date"
              />

              <Input
                label="Valid until *"
                register={travel.register("valid-until", {
                  required: "Valid until is required",
                })}
                error={travel.formState.errors["valid-until"]}
                type="date"
              />

              <Select
                label="Issued by (country) *"
                options={countriesOptions}
                control={travel.control}
                isDisabled={travel.formState.isSubmitting}
                placeholder="Select Issued by country"
                name="issued-country"
                register={travel.register("issued-country", { required: "Issued by (country) is required" })}
                error={travel.formState.errors["issued-country"]}
              />

              <Input
                label="Applicant's Home address *"
                placeholder="Home address"
                register={travel.register("home-address", {
                  required: "Home address is required",
                })}
                error={travel.formState.errors["home-address"]}
              />

              <Input
                label="Applicant's Email address *"
                placeholder="Email address"
                register={travel.register("email-address", {
                  required: "Email address is required",
                })}
                error={travel.formState.errors["email-address"]}
              />

              <div className="lg:col-span-2">
                <Input
                  label="Applicant's Telephone no *"
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
                legend="Personal data of the family member who is an EU, EEA or CH citizen or an UK national who is a withdrawal agreement beneficiary, have any? *"
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
                  label="Fist name *"
                  register={travel.register("citizen-first-name", {
                    required: { value: isEuCitizen, message: "First name is required" },
                  })}
                  error={travel.formState.errors["citizen-first-name"]}
                />

                <Input
                  label="Date of birth *"
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
                    label="Passport number or ID card *"
                    placeholder="Travel document number"
                    register={travel.register("citizen-travel-document-number", {
                      required: { value: isEuCitizen, message: "Passport number or ID card is required" },
                    })}
                    error={travel.formState.errors["citizen-travel-document-number"]}
                  />
                </div>

                <div className="col-span-full">
                  <Select
                    label="Family relationship with an EU, EEA or CH citizen or an UK national who is a Withdrawal Agreement beneficiary, if applicable *"
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
                legend="Residence in a country other than the country of current nationality? *"
                classNameContainer="col-span-full"
                checked={isResidence ? 2 : 1}
                register={contact.register("residence-in-a-country", { required: "Residence is required" })}
                error={contact.formState.errors["residence-in-a-country"]}
                disabled={contact.formState.isSubmitting}
                isOpen={isResidence}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                <Input
                  label="Resident permit or equivalent *"
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
                  label="Valid until *"
                  register={contact.register("resident-valid-until", {
                    required: { value: isResidence, message: "Valid until is required" },
                  })}
                  error={contact.formState.errors["resident-valid-until"]}
                  type="date"
                />
              </Group>

              <div className="col-span-full">
                <Input
                  label="Employer and employer's address and telephone number. For students, name and address of educational establishment. *"
                  classNameLabel="line-clamp-none"
                  register={contact.register("employers-address-telephone-number", {
                    required: "Employer's address and telephone number is required",
                  })}
                  error={contact.formState.errors["employers-address-telephone-number"]}
                />
              </div>

              <Input
                label="Current occupation *"
                register={contact.register("current-occupation", {
                  required: "Current occupation is required",
                })}
                error={contact.formState.errors["current-occupation"]}
              />

              <Select
                label="Purpose(s) of the journey *"
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
                label="Additional info on purpose of stay *"
                register={contact.register("purpose-of-journey-additional", {
                  required: "Additional information on purpose of stay is required",
                })}
                error={contact.formState.errors["purpose-of-journey-additional"]}
              />

              <Input
                label="Member State of main destination (and other Member States of destination, if applicable) *"
                placeholder="Member State of main destination"
                register={contact.register("main-destination", {
                  required: "Main destination is required",
                })}
                error={contact.formState.errors["main-destination"]}
              />
              <Input
                label="Member state of first entry *"
                register={contact.register("first-entry", {
                  required: "Member state of first entry is required",
                })}
                error={contact.formState.errors["first-entry"]}
              />

              <SelectNotCreatable
                label="Number of entries requested *"
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
                  label="Intended date of arrival of first intended stay in the Schengen area *"
                  placeholder="Intended date of arrival"
                  register={info.register("intended-date-of-arrival", {
                    required: "Intended date of arrival is required",
                  })}
                  error={info.formState.errors["intended-date-of-arrival"]}
                  type="date"
                />

                <Input
                  label="Intended date of departure from Schengen area after the first intended stay *"
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
                legend="Fingerprints collected previously for the purpose of applying for a Schengen visa? *"
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
                  label="Previously collected fingerprints date, if you know"
                  register={info.register("previously-collected-fingerprints-date")}
                  error={info.formState.errors["previously-collected-fingerprints-date"]}
                  type="date"
                />

                <Input
                  label="Previously collected fingerprints visa no, if you know"
                  register={info.register("previously-collected-fingerprints-visa-no")}
                  error={info.formState.errors["previously-collected-fingerprints-visa-no"]}
                />
              </Group>

              <Join
                legend="Entry permit for the final country of destination, where applicable"
                classNameContainer="col-span-full"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                <Input
                  label="Issue by"
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
                  label="Surname and first name of the inviting person(s) in the Member State(s). If not applicable, name of hotel(s) or temporary accommodation(s) in the Member State(s)"
                  register={info.register("surname-and-first-name-of-inviting-persons")}
                  error={info.formState.errors["surname-and-first-name-of-inviting-persons"]}
                  classNameLabel="line-clamp-none"
                />
              </div>

              <div className="col-span-full">
                <Input
                  label="Address and e-mail address of inviting person(s)/hotel(s) temporary accommodation(s)"
                  register={info.register("address-email-of-inviting-persons")}
                  error={info.formState.errors["address-email-of-inviting-persons"]}
                  classNameLabel="line-clamp-none"
                />
              </div>

              <Input
                label="Telephone no of inviting person"
                register={info.register("telephone-no-of-inviting-persons")}
                error={info.formState.errors["telephone-no-of-inviting-persons"]}
              />

              <Input
                label="Name and address of inviting com/org"
                register={info.register("name-address-of-inviting-company")}
                error={info.formState.errors["name-address-of-inviting-company"]}
              />

              <Input
                label="Telephone no of company/organization"
                register={info.register("telephone-no-of-inviting-company")}
                error={info.formState.errors["telephone-no-of-inviting-company"]}
              />

              <div className="col-span-full">
                <Input
                  label="Surname, first name, address, telephone no. and e-mail address of contact person in company/organization"
                  register={info.register("surname-and-first-name-of-contact-persons")}
                  error={info.formState.errors["surname-and-first-name-of-contact-persons"]}
                  classNameLabel="line-clamp-none"
                />
              </div>

              <div className="col-span-full">
                <Select
                  label="Cost of traveling and living during the applicant's stay is covered *"
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
