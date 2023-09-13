import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { Select, SelectNotCreatable } from "components/form/Select";
import { StepIndicator } from "components/form/StepIndicator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import countries from "../countries.json";

const countriesOptions = countries.map((e) => ({
  label: e.name,
  value: e.nationality,
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

const steps = ["Personal", "Documents", "Contact and Occupation"];

export function Schengen() {
  const personal = useForm();
  const travel = useForm();
  const [step, setStep] = useState(1);

  const clearPersonal = useFormPersist("personal-visa-data", {
    watch: personal.watch,
    setValue: personal.setValue,
    storage: window.localStorage,
  });

  const clearTravel = useFormPersist("travel-visa-data", {
    watch: travel.watch,
    setValue: travel.setValue,
    storage: window.localStorage,
    validate: true,
  });

  function personalInfoSubmit(data) {
    setStep(2);
  }

  function travelInfoSubmit(data) {
    setStep(3);
  }

  return (
    <main className="container mx-auto space-y-4 p-4">
      <Link to="/agent" className="flex w-max items-center rounded bg-brand-500 px-3 py-2 text-white">
        <span className="pr-2 text-2xl">
          <LeftArrow />
        </span>
        Back to dashboard
      </Link>

      <div className="space-y-4 rounded border border-gray-200 bg-white px-4 py-8 shadow-sm ">
        <StepIndicator steps={steps} current={step} />

        {step === 1 && (
          <form name="personal" className="space-y-4" onSubmit={personal.handleSubmit(personalInfoSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Surname"
                register={personal.register("surname", { required: "Surname is required" })}
                error={personal.formState.errors["surname"]}
              />

              <Input
                label="Surname at birth"
                register={personal.register("surname-at-birth", { required: "Surname at birth is required" })}
                error={personal.formState.errors["surname-at-birth"]}
              />

              <Input
                label="Fist name"
                register={personal.register("first-name", { required: "Fist name is required" })}
                error={personal.formState.errors["first-name"]}
              />

              <Input
                label="Date of birth"
                register={personal.register("date-of-birth", {
                  required: "Birth date is required",
                  max: { value: new Date().toISOString().split("T")[0], message: "Birth date cannot be future date" },
                })}
                error={personal.formState.errors["date-of-birth"]}
                type="date"
              />

              <Input
                label="Place of birth"
                register={personal.register("place-of-birth", { required: "Place of birth is required" })}
                error={personal.formState.errors["place-of-birth"]}
              />

              <Select
                label="Country of birth"
                options={countriesOptions}
                control={personal.control}
                placeholder="Select country of birth"
                name="country-of-birth"
                register={personal.register("country-of-birth", { required: "Country of birth is required" })}
                error={personal.formState.errors["country-of-birth"]}
              />

              <Select
                label="Current nationality"
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

              <div className="col-span-full md:col-span-1">
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
              </div>

              <div className=" flex flex-col gap-4 sm:col-span-2 md:col-span-3 md:row-start-auto lg:flex-row [&>*]:flex-1">
                <div className="flex flex-col gap-4 sm:flex-row [&>*]:flex-1">
                  <SelectNotCreatable
                    label="Sex (gender)"
                    options={sexesOption}
                    placeholder="Select your gender"
                    control={personal.control}
                    name="sex"
                    isSearchable={false}
                    register={personal.register("sex", { required: "Sex (gender) is required" })}
                    error={personal.formState.errors["sex"]}
                  />
                  <Select
                    label="Civil status"
                    options={civilStatusOptions}
                    control={personal.control}
                    name="civil-status"
                    placeholder="Select civil status"
                    register={personal.register("civil-status", { required: "Civil status is required" })}
                    error={personal.formState.errors["civil-status"]}
                  />
                </div>
                <Input
                  label="Parental authority (in case of minors) /legal guardian (surname, first name, address, if different from applicant's, telephone no., e-mail address, and nationality)"
                  placeholder="surname, first name, address .. etc"
                  classNameLabel="line-clamp-2 md:line-clamp-1"
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
          <form name="document" className="space-y-4" onSubmit={travel.handleSubmit(travelInfoSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="National identity number, where applicable"
                placeholder="National identity number"
                register={travel.register("national-identity-number", {
                  required: "National identity number is required",
                })}
                error={travel.formState.errors["national-identity-number"]}
              />

              <Select
                label="Type of travel document"
                options={documentTypeOptions}
                control={travel.control}
                placeholder="Select passport type"
                name="travel-document-type"
                register={travel.register("travel-document-type", { required: "Travel document type is required" })}
                error={travel.formState.errors["travel-document-type"]}
              />

              <Input
                label="Number of travel document"
                placeholder="Travel document number"
                register={travel.register("travel-document-number", { required: "Travel document number is required" })}
                error={travel.formState.errors["travel-document-number"]}
              />

              <Input
                label="Date of issue"
                register={travel.register("date-of-issue", {
                  required: "Issue date is required",
                })}
                error={travel.formState.errors["date-of-issue"]}
                type="date"
              />

              <Input
                label="Valid until"
                register={travel.register("valid-until", {
                  required: "Valid until is required",
                })}
                error={travel.formState.errors["valid-until"]}
                type="date"
              />

              <Select
                label="Issued by (country)"
                options={countriesOptions}
                control={travel.control}
                placeholder="Select Issued by country"
                name="issued-country"
                register={travel.register("issued-country", { required: "Issued by (country) is required" })}
                error={travel.formState.errors["issued-country"]}
              />

              <p className="[text-wrap:_balance col-span-full -mb-3 text-base font-medium text-gray-800">
                Personal data of the family member who is an EU, EEA or CH citizen or an UK national who is a Withdrawal
                Agreement beneficiary, if applicable Surname (Family name)
              </p>

              <Input
                label="Surname (citizen)"
                register={travel.register("citizen-surname")}
                error={personal.formState.errors["citizen-surname"]}
              />

              <Input
                label="Fist name (citizen)"
                register={travel.register("citizen-first-name")}
                error={personal.formState.errors["citizen-first-name"]}
              />

              <Input
                label="Date of birth (citizen)"
                register={travel.register("citizen-date-of-birth")}
                error={travel.formState.errors["citizen-date-of-birth"]}
                type="date"
              />

              <Select
                label="Nationality (citizen)"
                options={nationalityOptions}
                control={personal.control}
                name="citizen-nationality"
                placeholder="Select nationality"
                register={personal.register("citizen-nationality")}
                error={personal.formState.errors["citizen-nationality"]}
              />

              <Input
                label="Number of travel document or ID card (citizen)"
                placeholder="Travel document number"
                register={travel.register("citizen-travel-document-number")}
                error={travel.formState.errors["citizen-travel-document-number"]}
              />
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
