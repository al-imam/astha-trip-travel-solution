import axios from "axios";
import { Button } from "components/form/Button";
import { Group, Join } from "components/form/Group";
import { Input } from "components/form/Input";
import { Select, SelectNotCreatable } from "components/form/Select";
import { StepIndicator } from "components/form/StepIndicator";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import countries from "../countries.json";
import districts from "../districts.json";
import { fire, flattenObject, getNumberSelect } from "./util";
import { Spinner } from "./Spinner";

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

const purposeOfVisitOptions = ["Tourist", "Transit", "Business", "Diplomatic/Official"].map((value) => ({
  label: value,
  value,
}));

const validCountryOptions = ["ALL COUNTRIES OF THE WORLD EXCEPT ISRAIL"].map((value) => ({
  label: value.toLowerCase(),
  value,
}));

const steps = ["", "", ""];

export function Thailand() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [_, setForm] = useState({});

  const personal = useForm();
  const contact = useForm();
  const purpose = useForm();

  useEffect(() => {
    purpose.setValue("countries-for-which-travel-document-is-valid", validCountryOptions[0]);
  }, []);

  const cleanPersonal = useFormPersist("thailand-personal-submit", {
    watch: personal.watch,
    setValue: personal.setValue,
    storage: window.localStorage,
  });

  const cleanContact = useFormPersist("thailand-contact-submit", {
    watch: contact.watch,
    setValue: contact.setValue,
    storage: window.localStorage,
  });

  const cleanPurpose = useFormPersist("thailand-purpose-submit", {
    watch: purpose.watch,
    setValue: purpose.setValue,
    storage: window.localStorage,
  });

  function personalSubmit(data) {
    setForm((prev) => Object.assign(prev, flattenObject(data)));
    setStep(2);
  }

  function contactSubmit(data) {
    setForm((prev) => Object.assign(prev, flattenObject(data)));
    setStep(3);
  }

  async function purposeSubmit(__D) {
    await new Promise((r) => setTimeout(r, 1000));
    const data = flattenObject(Object.assign(_, __D));
    setForm(data);

    const serverRes = await axios.post("/api/visa-form/thailand", data).catch(console.log);
    if (!serverRes) return fire();

    fire("Successfully Done!", "success");

    /* 
    cleanContact.clear();
    cleanPersonal.clear();
    cleanPurpose.clear();
    */
  }

  return (
    <main className="container mx-auto space-y-4 p-4">
      <button
        disabled={contact.formState.isSubmitting || personal.formState.isSubmitting || purpose.formState.isSubmitting}
        onClick={() => navigate(-1)}
        className="my-1 inline-flex items-center rounded-md border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-blue-700 shadow hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300  disabled:opacity-0"
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
                label="Passport Number *"
                placeholder="Select passport number"
                options={[]}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="passport-number"
                register={personal.register("passport-number", { required: "Travel document number is required" })}
                error={personal.formState.errors["passport-number"]}
              />

              <SelectNotCreatable
                label="Type Of Visa Requested *"
                placeholder="Select visa type"
                options={typeOfVisaRequestedOptions}
                isDisabled={personal.formState.isSubmitting}
                control={personal.control}
                name="type-of-visa-requested"
                register={personal.register("type-of-visa-requested", {
                  required: "Type of visa requested is required",
                })}
                error={personal.formState.errors["type-of-visa-requested"]}
              />

              <Select
                label="Number Of Entries Requested *"
                placeholder="Select number of entry"
                options={numberOfEntryOptions}
                isDisabled={personal.formState.isSubmitting}
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
                isDisabled={personal.formState.isSubmitting}
                control={personal.control}
                name="name-title"
                register={personal.register("name-title", {
                  required: "Title is required",
                })}
                error={personal.formState.errors["name-title"]}
              />

              <Input
                label="First Name *"
                register={personal.register("first-name", { required: "First name is required" })}
                error={personal.formState.errors["first-name"]}
              />

              <Input
                label="Middle Name"
                register={personal.register("middle-name")}
                error={personal.formState.errors["middle-name"]}
              />

              <Input
                label="Last Name *"
                register={personal.register("last-name", { required: "Last name is required" })}
                error={personal.formState.errors["last-name"]}
              />

              <Input
                label="Former Name"
                register={personal.register("former-name")}
                error={personal.formState.errors["former-name"]}
              />

              <Select
                label="Nationality *"
                options={nationalityOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="nationality"
                placeholder="Select nationality"
                register={personal.register("nationality", { required: "Nationality is required" })}
                error={personal.formState.errors["nationality"]}
              />

              <Select
                label="Nationality At Birth"
                placeholder="Select nationality at birth"
                options={nationalityOptions}
                isDisabled={personal.formState.isSubmitting}
                control={personal.control}
                name="nationality-at-birth"
                register={personal.register("nationality-at-birth", { required: "Nationality at birth is required" })}
                error={personal.formState.errors["nationality-at-birth"]}
              />

              <Select
                label="Birth Place *"
                placeholder="Select birth place"
                name="place-of-birth"
                options={placeOfBirthOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                register={personal.register("place-of-birth", { required: "Birth place is required" })}
                error={personal.formState.errors["place-of-birth"]}
              />

              <SelectNotCreatable
                label="Marital Status *"
                options={maritalStatusOptions}
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="marital-status"
                placeholder="Select marital status"
                register={personal.register("marital-status", { required: "Marital Status is required" })}
                error={personal.formState.errors["marital-status"]}
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

              <SelectNotCreatable
                label="Type Of Passport *"
                options={typeOfPassportOptions}
                placeholder="Select passport type"
                control={personal.control}
                isDisabled={personal.formState.isSubmitting}
                name="type-of-passport"
                register={personal.register("type-of-passport", { required: "Type of passport is required" })}
                error={personal.formState.errors["type-of-passport"]}
              />


              <Select
                label="Passport issued at *"
                control={personal.control}
                name="passport-issued-at"
                options={placeOfBirthOptions}
                register={personal.register("passport-issued-at", {
                  required: "Issue at is required",
                })}
                error={personal.formState.errors["passport-issued-at"]}
                isDisabled={personal.formState.isSubmitting}
                placeholder="Select Passport issued at"
              />

              <Input
                label="Passport Date Of Issue *"
                register={personal.register("passport-date-of-issue", {
                  required: "Date of issue is required",
                })}
                error={personal.formState.errors["passport-date-of-issue"]}
                type="date"
              />

              <Input
                label="Passport Expire Date *"
                register={personal.register("passport-expire-date", {
                  required: "Expire date is required",
                })}
                error={personal.formState.errors["passport-expire-date"]}
                type="date"
              />

              <Input
                label="Occupation (Present Position, Name Of Employer) *"
                placeholder="Occupation"
                register={personal.register("occupation", {
                  required: "Occupation is required",
                })}
                error={personal.formState.errors["occupation"]}
              />
            </fieldset>

            <div className="flex justify-end">
              <Button disabled={personal.formState.isSubmitting} className="disabled:cursor-pointer">
                Next {personal.formState.isSubmitting ? <Spinner className="ml-2" /> : <NextIcon className="ml-2" />}
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form name="contact" autoComplete="off" className="space-y-4" onSubmit={contact.handleSubmit(contactSubmit)}>
            <fieldset disabled={contact.formState.isSubmitting} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Current Address *"
                register={contact.register("current-address", {
                  required: "Current address is required",
                })}
                error={contact.formState.errors["current-address"]}
              />

              <Input
                label="Telephone Number *"
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
                label="Permanent Address (If Different From Above)"
                placeholder="Permanent address"
                register={contact.register("permanent-address")}
                error={contact.formState.errors["permanent-address"]}
              />

              <Input
                label="Permanent Telephone"
                register={contact.register("permanent-telephone")}
                error={contact.formState.errors["permanent-telephone"]}
              />

              <Select
                label="Traveling By *"
                placeholder="Select traveling method"
                options={travelingByOptions}
                control={contact.control}
                isDisabled={contact.formState.isSubmitting}
                name="traveling-by"
                register={contact.register("traveling-by", { required: "Traveling method is required" })}
                error={contact.formState.errors["traveling-by"]}
              />

              <div className="col-span-full flex flex-col gap-4 sm:flex-row [&>:first-child]:grow ">
                <Input
                  label="Names, Dates And Places Of Birth Of Minor Children (If Accompanying)"
                  classNameLabel="line-clamp-none"
                  register={contact.register("names-dates-and-places-of-birth-of-minor-children")}
                  error={contact.formState.errors["names-dates-and-places-of-birth-of-minor-children"]}
                />
                <Input
                  label="Date Of Arrival In And Departure From Thailand"
                  classNameLabel="line-clamp-none"
                  register={contact.register("date-of-arrival-in-and-departure-from-thailand")}
                  error={contact.formState.errors["date-of-arrival-in-and-departure-from-thailand"]}
                  type="date"
                />
              </div>

              <Input
                label="Flight No Or Vessel's Name"
                register={contact.register("flight_no_or_vessel_name", {
                  required: "Flight no or vessel's name is required",
                })}
                error={contact.formState.errors["flight_no_or_vessel_name"]}
              />

              <Input
                label="Duration Of Proposed Stay"
                register={contact.register("duration-of-proposed-stay", {
                  required: "Duration of proposed stay is required",
                })}
                error={contact.formState.errors["duration-of-proposed-stay"]}
              />
            </fieldset>

            <div className="flex justify-between">
              <Button
                disabled={contact.formState.isSubmitting}
                className="disabled:opacity-0"
                type="button"
                onClick={() => setStep(1)}
              >
                <NextIcon className="mr-2 scale-x-[-1]" /> Previous
              </Button>
              <Button disabled={contact.formState.isSubmitting} className="disabled:cursor-pointer">
                Next {contact.formState.isSubmitting ? <Spinner className="ml-2" /> : <NextIcon className="ml-2" />}
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form name="purpose" autoComplete="off" className="space-y-4" onSubmit={purpose.handleSubmit(purposeSubmit)}>
            <fieldset disabled={purpose.formState.isSubmitting} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Date Of Previous Visit To Thailand *"
                register={purpose.register("date-of-previous-visit", {
                  required: "Date of previous visit to thailand is required",
                })}
                error={purpose.formState.errors["date-of-previous-visit"]}
                type="date"
              />

              <Select
                label="Purpose Of Visit *"
                placeholder="Select purpose of visit"
                options={purposeOfVisitOptions}
                control={purpose.control}
                isDisabled={purpose.formState.isSubmitting}
                name="purpose-of-visit"
                register={purpose.register("purpose-of-visit", { required: "purpose of visit is required" })}
                error={purpose.formState.errors["purpose-of-visit"]}
              />

              <Select
                label="Countries For Which Travel Document Is Valid *"
                placeholder="Select countries"
                options={validCountryOptions}
                control={purpose.control}
                isDisabled={purpose.formState.isSubmitting}
                name="countries-for-which-travel-document-is-valid"
                register={purpose.register("countries-for-which-travel-document-is-valid", {
                  required: "Countries is required",
                })}
                error={purpose.formState.errors["countries-for-which-travel-document-is-valid"]}
              />

              <Input
                label="Proposed Address In Thailand *"
                register={purpose.register("proposed-address-in-thailand", {
                  required: "Proposed address in thailand is required",
                })}
                error={purpose.formState.errors["proposed-address-in-thailand"]}
              />

              <Input
                label="Name And Address Of Local Guarantor *"
                register={purpose.register("name-and-address-of-local-guarantor", {
                  required: "Name and address of local guarantor is required",
                })}
                error={purpose.formState.errors["name-and-address-of-local-guarantor"]}
              />

              <Input
                label="Telephone/Fax Of Local Guarantor *"
                register={purpose.register("telephone-fax-of-local-guarantor", {
                  required: "Telephone/fax is required",
                })}
                error={purpose.formState.errors["telephone-fax-of-local-guarantor"]}
              />

              <Input
                label="Name And Address Of Guarantor In Thailand *"
                register={purpose.register("name-and-address-of-guarantor-in-thailand")}
                error={purpose.formState.errors["name-and-address-of-guarantor-in-thailand"]}
              />

              <Input
                label="Telephone/Fax Of Thailand Guarantor *"
                register={purpose.register("telephone-fax-of-thailand-guarantor")}
                error={purpose.formState.errors["telephone-fax-of-thailand-guarantor"]}
              />
            </fieldset>

            <div className="flex justify-between">
              <Button
                disabled={purpose.formState.isSubmitting}
                className="disabled:opacity-0"
                type="button"
                onClick={() => setStep(2)}
              >
                <NextIcon className="mr-2 scale-x-[-1] cursor-none" /> Previous
              </Button>
              <Button disabled={purpose.formState.isSubmitting} className="disabled:cursor-pointer">
                Submit {purpose.formState.isSubmitting ? <Spinner className="ml-2" /> : <NextIcon className="ml-2" />}
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
