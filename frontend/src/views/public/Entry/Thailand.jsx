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
import { flattenObject, getNumberSelect } from "./util";

const countriesOptions = countries.map((e) => ({
  label: e.name,
  value: e.nationality,
}));

const placeOfBirthOptions = districts.map((value) => ({
  label: value,
  value,
}));

const nationalityOptions = countries.map(({ nationality }) => ({
  label: nationality,
  value: nationality,
}));

const typeOfVisaRequestedOptions = [
  "Diplomatic Visa",
  "Official Visa",
  "Courtesy Visa",
  "SMART Visa",
  "Non-Immigrant Visa",
  "Tourist Visa",
  "Transit Visa",
].map((value) => ({
  label: value,
  value,
}));

const typeOfPassportOptions = [
  "Ordinary passport",
  "Diplomatic passport",
  "Official passport",
  "Travel document",
  "Certificate identification",
  "Document identification",
  "Laissez-passer",
].map((value) => ({
  label: value,
  value: value.toLocaleUpperCase(),
}));

const numberOfEntryOptions = [...getNumberSelect(1, 3), { label: "Multi", value: "MULTI" }];

const nameTitleOptions = ["Mr.", "Mrs.", "Master", "Miss"].map((value) => ({
  label: value.replace(/\.$/, ""),
  value,
}));

const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"].map((value) => ({
  label: value,
  value: value.toLocaleUpperCase(),
}));

const travelingByOptions = ["Ait plane", "Train", "Bus / Car", "Cruise"].map((value) => ({
  label: value,
  value: value.toLocaleUpperCase(),
}));

const sexesOption = ["Male", "Female"].map((value) => ({
  label: value,
  value,
}));

const steps = ["", "", "", ""];

export function Thailand() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [_, setForm] = useState({});

  const personal = useForm();
  const contact = useForm();

  const cleanPersonal = useFormPersist("thailand-personal-submit", {
    watch: personal.watch,
    setValue: personal.setValue,
    storage: window.sessionStorage,
  });

  function personalSubmit(data) {
    console.log(data);
    setForm((prev) => Object.assign(prev, flattenObject(data)));
    setStep(2);
  }

  function contactSubmit(data) {
    console.log(data);
    setForm((prev) => Object.assign(prev, flattenObject(data)));
    setStep(2);
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
          <form
            name="personal"
            className="space-y-4"
            onSubmit={personal.handleSubmit(personalSubmit)}
            autoComplete="off"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Select
                label="Passport number *"
                placeholder="Select passport number"
                options={[]}
                control={personal.control}
                name="passport-number"
                register={personal.register("passport-number", { required: "Travel document number is required" })}
                error={personal.formState.errors["passport-number"]}
              />

              <SelectNotCreatable
                label="Type of visa requested *"
                placeholder="Select visa type"
                options={typeOfVisaRequestedOptions}
                control={personal.control}
                name="type-of-visa-requested"
                register={personal.register("type-of-visa-requested", {
                  required: "Type of visa requested is required",
                })}
                error={personal.formState.errors["type-of-visa-requested"]}
              />

              <Select
                label="Number of entries requested *"
                placeholder="Select number of entry"
                options={numberOfEntryOptions}
                control={personal.control}
                name="number-of-entries"
                register={personal.register("number-of-entries", {
                  required: "Number of entries requested is required",
                })}
                error={personal.formState.errors["number-of-entries"]}
              />

              <SelectNotCreatable
                label="Title *"
                placeholder="Select title"
                options={nameTitleOptions}
                control={personal.control}
                name="name-title"
                register={personal.register("name-title", {
                  required: "Title is required",
                })}
                error={personal.formState.errors["name-title"]}
              />

              <Input
                label="First name *"
                register={personal.register("first-name", { required: "First name is required" })}
                error={personal.formState.errors["first-name"]}
              />

              <Input
                label="Middle name"
                register={personal.register("middle-name")}
                error={personal.formState.errors["middle-name"]}
              />

              <Input
                label="Last name *"
                register={personal.register("last-name", { required: "Last name is required" })}
                error={personal.formState.errors["last-name"]}
              />

              <Input
                label="Former name"
                register={personal.register("former-name")}
                error={personal.formState.errors["former-name"]}
              />

              <Select
                label="Nationality *"
                options={nationalityOptions}
                control={personal.control}
                name="nationality"
                placeholder="Select nationality"
                register={personal.register("nationality", { required: "Nationality is required" })}
                error={personal.formState.errors["nationality"]}
              />

              <Select
                label="Nationality at birth"
                placeholder="Select nationality at birth"
                options={nationalityOptions}
                control={personal.control}
                name="nationality-at-birth"
                register={personal.register("nationality-at-birth", { required: "Nationality at birth is required" })}
                error={personal.formState.errors["nationality-at-birth"]}
              />

              <Select
                label="Birth place *"
                placeholder="Select birth place"
                name="place-of-birth"
                options={placeOfBirthOptions}
                control={personal.control}
                register={personal.register("place-of-birth", { required: "Birth place is required" })}
                error={personal.formState.errors["place-of-birth"]}
              />

              <SelectNotCreatable
                label="Marital Status *"
                options={maritalStatusOptions}
                control={personal.control}
                name="marital-status"
                placeholder="Select marital status"
                register={personal.register("marital-status", { required: "Marital Status is required" })}
                error={personal.formState.errors["marital-status"]}
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

              <SelectNotCreatable
                label="Type of passport *"
                options={typeOfPassportOptions}
                placeholder="Select passport type"
                control={personal.control}
                name="type-of-passport"
                register={personal.register("type-of-passport", { required: "Type of passport is required" })}
                error={personal.formState.errors["type-of-passport"]}
              />

              <Input
                label="Passport issued at *"
                register={personal.register("passport-issued-at", {
                  required: "Issue at is required",
                })}
                error={personal.formState.errors["passport-issued-at"]}
                type="date"
              />

              <Input
                label="Passport date of issue *"
                register={personal.register("passport-date-of-issue", {
                  required: "Date of issue is required",
                })}
                error={personal.formState.errors["passport-date-of-issue"]}
                type="date"
              />

              <Input
                label="Passport expire date *"
                register={personal.register("passport-expire-date", {
                  required: "Expire date is required",
                })}
                error={personal.formState.errors["passport-expire-date"]}
                type="date"
              />

              <Input
                label="Occupation (present position, name of employer) *"
                placeholder="Occupation"
                register={personal.register("occupation", {
                  required: "Occupation is required",
                })}
                error={personal.formState.errors["occupation"]}
              />
            </div>

            <div className="flex justify-end">
              <Button>
                Next <NextIcon className="ml-2" />
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form name="contact" autoComplete="off" className="space-y-4" onSubmit={contact.handleSubmit(contactSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Current address *"
                register={contact.register("current-address", {
                  required: "Current address is required",
                })}
                error={contact.formState.errors["current-address"]}
              />

              <Input
                label="Telephone number *"
                register={contact.register("telephone", {
                  required: "Telephone number is required",
                })}
                error={contact.formState.errors["telephone"]}
              />

              <Input
                label="Email *"
                register={contact.register("email", {
                  required: "Email is required",
                })}
                error={contact.formState.errors["email"]}
              />

              <Input
                label="Permanent Address (if different from above)"
                placeholder="Permanent address"
                register={contact.register("permanent-address")}
                error={contact.formState.errors["permanent-address"]}
              />

              <Input
                label="Permanent telephone"
                register={contact.register("permanent-telephone")}
                error={contact.formState.errors["permanent-telephone"]}
              />

              <div className="col-span-full flex flex-col gap-4 sm:flex-row [&>:first-child]:grow ">
                <Input
                  label="Names, dates and places of birth of minor children (if accompanying)"
                  classNameLabel="line-clamp-none"
                  register={contact.register("permanent-telephone")}
                  error={contact.formState.errors["permanent-telephone"]}
                />
                <Input
                  label="Date of Arrival in and Departure from Thailand"
                  classNameLabel="line-clamp-none"
                  register={contact.register("permanent-telephone")}
                  error={contact.formState.errors["permanent-telephone"]}
                  type="date"
                />
              </div>

              <Select
                label="Traveling by *"
                placeholder="Select traveling method"
                options={travelingByOptions}
                control={contact.control}
                name="traveling-by"
                register={contact.register("traveling-by", { required: "Traveling method is required" })}
                error={contact.formState.errors["traveling-by"]}
              />

              <Input
                label="Flight no or vessel's name"
                register={contact.register("flight_no_or_vessel_name", {
                  required: "Flight no or vessel's name is required",
                })}
                error={contact.formState.errors["flight_no_or_vessel_name"]}
              />

              <Input
                label="Duration of proposed stay"
                register={contact.register("duration-of-proposed-stay", {
                  required: "Duration of proposed stay is required",
                })}
                error={contact.formState.errors["duration-of-proposed-stay"]}
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
