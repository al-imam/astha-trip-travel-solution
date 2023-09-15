import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { Select, SelectNotCreatable } from "components/form/Select";
import { StepIndicator } from "components/form/StepIndicator";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import countries from "../countries.json";
import districts from "../districts.json";
import { Radio } from "components/form/Radio";

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

const nationalityOptions = countries.map((e) => ({
  label: e.nationality,
  value: e.nationality,
}));

const documentTypeOptions = ["Ordinary", "Diplomatic", "Service", "Official", "Special"].map((e) => ({
  label: `${e} passport`,
  value: `${e} passport`,
}));

const civilStatusOptions = ["Single", "Married", "Registered Partnership", "Separated", "Divorced", "Widow(er)"].map(
  (e) => ({
    label: e,
    value: e,
  })
);

const sexesOption = ["Male", "Female"].map((e) => ({
  label: e,
  value: e,
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

const steps = ["", "", "", ""];

export function Schengen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const personal = useForm();
  const travel = useForm();
  const contact = useForm();
  const info = useForm();

  const isResidence = contact.watch("residence-in-a-country") === "Yes";
  const isEuCitizen = travel.watch("have-eu-citizen") === "Yes";
  const isFingerprintsCollectedPreviously = info.watch("fingerprints-collected-previously") === "Yes";

  useFormPersist("personal-visa-data", {
    watch: personal.watch,
    setValue: personal.setValue,
    storage: window.sessionStorage,
  });

  useFormPersist("travel-visa-data", {
    watch: travel.watch,
    setValue: travel.setValue,
    storage: window.sessionStorage,
  });

  function personalSubmit(data) {
    console.log(data);
    setStep(2);
  }

  function travelSubmit(data) {
    console.log(data);
    setStep(3);
  }

  function contactSubmit(data) {
    console.log(data);
    setStep(4);
  }

  function infoSubmit(data) {
    console.log(data);
    // setStep(4);
  }

  return (
    <main className="container mx-auto space-y-4 p-4">
      <button
        onClick={() => navigate(-1)}
        className="my-1 inline-flex items-center rounded-md border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-blue-700 shadow hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 "
      >
        <NextIcon className="mr-2 scale-x-[-1]" />
        <span>
          <span className="hidden md:inline"> Back to </span>dashboard
        </span>
      </button>

      <div className="space-y-4 rounded border border-gray-200 bg-white px-4 py-8 shadow-sm ">
        <StepIndicator steps={steps} current={step} />

        {step === 1 && (
          <form name="personal" className="space-y-4" onSubmit={personal.handleSubmit(personalSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Select
                label="Number of travel document *"
                placeholder="Select passport number"
                options={[]}
                control={personal.control}
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
                register={personal.register("place-of-birth", { required: "Place of birth is required" })}
                error={personal.formState.errors["place-of-birth"]}
              />

              <Select
                label="Country of birth *"
                options={countriesOptions}
                control={personal.control}
                placeholder="Select country of birth"
                name="country-of-birth"
                register={personal.register("country-of-birth", { required: "Country of birth is required" })}
                error={personal.formState.errors["country-of-birth"]}
              />

              <Select
                label="Current nationality *"
                options={nationalityOptions}
                control={personal.control}
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
                name="sex"
                isSearchable={false}
                register={personal.register("sex", { required: "Sex (gender) is required" })}
                error={personal.formState.errors["sex"]}
              />
              <Select
                label="Civil status *"
                options={civilStatusOptions}
                control={personal.control}
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
            </div>

            <div className="flex justify-end">
              <Button>
                Next <NextIcon className="ml-2" />
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form name="document" className="space-y-4" onSubmit={travel.handleSubmit(travelSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                placeholder="Select Issued by country"
                name="issued-country"
                register={travel.register("issued-country", { required: "Issued by (country) is required" })}
                error={travel.formState.errors["issued-country"]}
              />

              <div className="col-span-full flex flex-col gap-4 lg:flex-row">
                <Radio
                  label="Personal data of the family member who is an EU, EEA or CH citizen or an UK national who is a Withdrawal Agreement beneficiary, Have any? *"
                  options={["No", "Yes"]}
                  classNameLabel="line-clamp-none"
                  checked="No"
                  register={travel.register("have-eu-citizen", { required: "Answer the question" })}
                  error={travel.formState.errors["have-eu-citizen"]}
                />

                <Select
                  label="Family relationship with an EU, EEA or CH citizen or an UK national who is a Withdrawal Agreement beneficiary, if applicable"
                  options={citizenRelationshipOptions}
                  control={travel.control}
                  name="citizen-relationship"
                  isClearable
                  classNameLabel="line-clamp-none"
                  placeholder="Select relationship"
                  register={travel.register("citizen-relationship")}
                  error={travel.formState.errors["citizen-relationship"]}
                />
              </div>

              {isEuCitizen && (
                <Fragment>
                  <Input
                    label="Surname (EU, EEA or CH citizen or an UK national)"
                    register={travel.register("citizen-surname")}
                    error={travel.formState.errors["citizen-surname"]}
                  />

                  <Input
                    label="Fist name (EU, EEA or CH citizen or an UK national)"
                    register={travel.register("citizen-first-name")}
                    error={travel.formState.errors["citizen-first-name"]}
                  />

                  <Input
                    label="Date of birth (EU, EEA or CH citizen or an UK national)"
                    register={travel.register("citizen-date-of-birth")}
                    error={travel.formState.errors["citizen-date-of-birth"]}
                    type="date"
                  />

                  <Select
                    label="Nationality (EU, EEA or CH citizen or an UK national)"
                    options={nationalityOptions}
                    control={travel.control}
                    name="citizen-nationality"
                    placeholder="Select nationality"
                    register={travel.register("citizen-nationality")}
                    error={travel.formState.errors["citizen-nationality"]}
                  />

                  <Input
                    label="Number of travel document or ID card (EU, EEA or CH citizen or an UK national)"
                    placeholder="Travel document number"
                    register={travel.register("citizen-travel-document-number")}
                    error={travel.formState.errors["citizen-travel-document-number"]}
                  />
                </Fragment>
              )}
            </div>

            <div className="flex justify-between">
              <Button type="button" onClick={() => setStep(1)}>
                <NextIcon className="mr-2 scale-x-[-1]" /> Previous
              </Button>
              <Button>
                Next <NextIcon className="ml-2" />
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form name="document" className="space-y-4" onSubmit={contact.handleSubmit(contactSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Applicant's home address *"
                placeholder="Home address"
                register={contact.register("home-address", {
                  required: "Home address is required",
                })}
                error={contact.formState.errors["home-address"]}
              />

              <Input
                label="Email address *"
                register={contact.register("email-address", {
                  required: "Email address is required",
                })}
                error={contact.formState.errors["home-address"]}
              />

              <Input
                label="Telephone no *"
                register={contact.register("telephone-no", {
                  required: "Telephone no is required",
                  pattern: { value: /^(\+\d{1,})?(\d+)$/, message: "Invalid telephone" },
                })}
                error={contact.formState.errors["telephone-no"]}
              />

              <div className={twMerge(isResidence ? "lg:row-start-4" : "lg:row-start-3")}>
                <Input
                  label="Current occupation *"
                  register={contact.register("current-occupation", {
                    required: "Current occupation is required",
                  })}
                  error={contact.formState.errors["current-occupation"]}
                />
              </div>

              <div className="col-span-full flex flex-col gap-4 lg:flex-row">
                <Input
                  label="Employer and employer's address and telephone number. For students, name and address of educational establishment. *"
                  classNameLabel="line-clamp-none"
                  register={contact.register("employers-address-telephone-number", {
                    required: "Employer's address and telephone number is required",
                  })}
                  error={contact.formState.errors["employers-address-telephone-number"]}
                />

                <Radio
                  label="Residence in a country other than the country of current nationality? *"
                  options={["No", "Yes"]}
                  classNameLabel="line-clamp-none"
                  checked="No"
                  register={contact.register("residence-in-a-country", { required: "Residence is required" })}
                  error={contact.formState.errors["residence-in-a-country"]}
                />
              </div>

              {isResidence && (
                <Fragment>
                  <Input
                    label="Resident permit or equivalent *"
                    register={contact.register("resident-permit-or-equivalent", {
                      required: "Telephone no is required",
                    })}
                    error={contact.formState.errors["resident-permit-or-equivalent"]}
                  />

                  <Input
                    label="No (Resident) *"
                    register={contact.register("resident-no", {
                      required: "No is required",
                    })}
                    error={contact.formState.errors["resident-no"]}
                  />

                  <Input
                    label="Valid until *"
                    register={contact.register("resident-valid-until", {
                      required: "Valid until is required",
                    })}
                    error={contact.formState.errors["resident-valid-until"]}
                    type="date"
                  />
                </Fragment>
              )}

              <Select
                label="Purpose(s) of the journey *"
                control={contact.control}
                options={purposeOfJourneyOptions}
                name="purpose-of-journey"
                register={contact.register("purpose-of-journey", {
                  required: "Purpose(s) of the journey is required",
                })}
                error={contact.formState.errors["purpose-of-journey"]}
              />

              <Input
                label="Additional information on purpose of stay *"
                register={contact.register("purpose-of-journey-additional", {
                  required: "Additional information on purpose of stay is required",
                })}
                error={contact.formState.errors["purpose-of-journey-additional"]}
              />
            </div>

            <div className="flex justify-between">
              <Button type="button" onClick={() => setStep(2)}>
                <NextIcon className="mr-2 scale-x-[-1]" /> Previous
              </Button>
              <Button>
                Next <NextIcon className="ml-2" />
              </Button>
            </div>
          </form>
        )}

        {step === 4 && (
          <form name="document" className="space-y-4" onSubmit={info.handleSubmit(infoSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Member State of main destination (and other Member States of destination, if applicable) *"
                placeholder="Member State of main destination"
                register={info.register("main-destination", {
                  required: "Main destination is required",
                })}
                error={info.formState.errors["main-destination"]}
              />
              <Input
                label="Member state of first entry *"
                register={info.register("first-entry", {
                  required: "Member state of first entry is required",
                })}
                error={info.formState.errors["first-entry"]}
              />

              <SelectNotCreatable
                label="Number of entries requested *"
                placeholder="Select Number of entries requested"
                options={numberOfEntryRequestOptions}
                control={info.control}
                name="number-of-entries-requested"
                register={info.register("number-of-entries-requested", {
                  required: "Number of entries requested is required",
                })}
                error={info.formState.errors["number-of-entries-requested"]}
              />

              <div className="col-span-full flex flex-col gap-4 md:flex-row [&>*]:flex-1 ">
                <Input
                  label="Intended date of arrival of first intended stay in the Schengen area *"
                  classNameLabel="line-clamp-none md:line-clamp-2  3xl:line-clamp-1"
                  placeholder="Intended date of arrival"
                  register={info.register("intended-date-of-arrival", {
                    required: "Intended date of arrival is required",
                  })}
                  error={info.formState.errors["intended-date-of-arrival"]}
                  type="date"
                />

                <Input
                  label="Intended date of departure from Schengen area after the first intended stay *"
                  classNameLabel="line-clamp-none md:line-clamp-2  3xl:line-clamp-1"
                  placeholder="Intended date of arrival"
                  register={info.register("intended-date-of-departure", {
                    required: "Intended date of departure is required",
                  })}
                  error={info.formState.errors["intended-date-of-departure"]}
                  type="date"
                />

                <Radio
                  label="Fingerprints collected previously for the purpose of applying for a Schengen visa? *"
                  options={["No", "Yes"]}
                  classNameLabel="line-clamp-none md:line-clamp-2  3xl:line-clamp-1"
                  checked="No"
                  register={info.register("fingerprints-collected-previously", {
                    required: "Fingerprints collected previously is required",
                  })}
                  error={info.formState.errors["fingerprints-collected-previously"]}
                />
              </div>

              {isFingerprintsCollectedPreviously && (
                <Fragment>
                  <Input
                    label="Previously collected fingerprints date, if you know"
                    register={info.register("previously-collected-fingerprints-date")}
                    error={info.formState.errors["previously-collected-fingerprints-date"]}
                  />

                  <Input
                    label="Previously collected fingerprints visa no, if you know"
                    register={info.register("previously-collected-fingerprints-visa-no")}
                    error={info.formState.errors["previously-collected-fingerprints-visa-no"]}
                  />
                </Fragment>
              )}
            </div>

            <div className="flex justify-between">
              <Button type="button" onClick={() => setStep(2)}>
                <NextIcon className="mr-2 scale-x-[-1]" /> Previous
              </Button>
              <Button>
                Next <NextIcon className="ml-2" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export function LeftArrow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.85Z"
      ></path>
    </svg>
  );
}

function NextIcon({ className, ...rest }) {
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
