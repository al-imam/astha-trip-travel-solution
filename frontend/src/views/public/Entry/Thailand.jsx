import axios from "axios";
import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { AsyncSelect, Select, SelectNotCreatable } from "components/form/Select";
import { StepIndicator } from "components/form/StepIndicator";
import { useAuth } from "hook/useAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import countries from "../countries.json";
import districts from "../districts.json";
import { Spinner } from "./Spinner";
import { fire, flattenObject, formatDateToYYYYMMDD, getExactOption, getNumberSelect, populate, setValue } from "./util";

const placeOfBirthOptions = districts.map((value) => ({
  label: value,
  value,
}));

const nationalityOptions = countries.map(({ nationality }) => ({
  label: nationality,
  value: nationality,
}));

const typeOfVisaRequestedOptions = [
  "Tourist Visa",
  "Diplomatic Visa",
  "Official Visa",
  "Courtesy Visa",
  "SMART Visa",
  "Non-Immigrant Visa",
  "Transit Visa",
].map((value) => ({
  label: value,
  value,
}));

const numberOfEntryOptions = [...getNumberSelect(1, 3), { label: "Multi", value: "MULTI" }];

const nameTitleOptions = ["Mr", "Mrs", "Miss"].map((value) => ({
  label: value,
  value: value === "Miss" ? "undefined" : value,
}));

const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"].map((value) => ({
  label: value,
  value: value.toLocaleUpperCase(),
}));

const travelingByOptions = ["Thai Air", "Biman Bangladesh", "Us Bangla"].map((value) => ({
  label: value,
  value: value.toLocaleUpperCase(),
}));

const purposeOfVisitOptions = ["Tourism", "Transit", "Business", "Diplomatic/Official"].map((value) => ({
  label: value,
  value,
}));

const validCountryOptions = ["ALL COUNTRIES OF THE WORLD EXCEPT ISRAIL"].map((value) => ({
  label: value.toLowerCase(),
  value,
}));

const steps = ["", "", ""];

const proposedAddressInThailandOptions = [
  "Hotel Ambassador Sukimvit, Soi-11, Bangkok",
  "Sofitel Bangkok Sukhumvit 189 Sukhumvit Road, Khlong Toei Nuea, Watthana, Bangkok 10110",
  "Grand Hyatt Erawan Bangkok 494 Ratchadamri Rd, Lumphini, Pathum Wan, Bangkok 10330",
  "Aloft Bangkok Sukhumvit 11 35 Sukhumvit 11 Alley, Klongtoey-nua, Watthana, Bangkok 10110",
  "Holiday Inn Express Bangkok Sukhumvit 11 30 Sukhumvit Soi 11 Klongtoey, Nua, Watthana, Bangkok 10110",
  "Grand President Bangkok 16 Soi Sukhumvit 11, Khlong Toei Nuea, Watthana, Bangkok 10110",
  "Mövenpick Hotel Sukhumvit 15 Bangkok 47 Sukhumvit 15, Khwaeng Khlong Toei Nuea, Khlong Toei, Bangkok 10110",
  "Radisson Suites Bangkok Sukhumvit 23/2 Soi Sukhumvit 13, Khwaeng Khlong Toei Nuea, Khlong Toei, Bangkok 10110",
  "Novotel Bangkok Ploenchit Sukhumvit 566 Phloen Chit Rd, Khwaeng Lumphini, Pathum Wan, Bangkok 10330",
  "Pullman Bangkok Grande Sukhumvit Asoke 30 Sukhumvit, 21 Asok Montri Rd, Watthana, Bangkok 10110",
].map((value) => ({
  label: value,
  value: value.toUpperCase(),
}));

const proposedAddressInThailandOptionsData = {
  "Sofitel Bangkok Sukhumvit 189 Sukhumvit Road, Khlong Toei Nuea, Watthana, Bangkok 10110": {
    contact: "+66 2 126 9999",
  },
  "Grand Hyatt Erawan Bangkok 494 Ratchadamri Rd, Lumphini, Pathum Wan, Bangkok 10330": {
    contact: "+66 2 254 1234",
  },
  "Aloft Bangkok Sukhumvit 11 35 Sukhumvit 11 Alley, Klongtoey-nua, Watthana, Bangkok 10110": {
    contact: "+66 2 207 7000",
  },
  "Holiday Inn Express Bangkok Sukhumvit 11 30 Sukhumvit Soi 11 Klongtoey, Nua, Watthana, Bangkok 10110": {
    contact: "+66 2 119 4777",
  },
  "Grand President Bangkok 16 Soi Sukhumvit 11, Khlong Toei Nuea, Watthana, Bangkok 10110": {
    contact: "+66 2 651 1200",
  },
  "Mövenpick Hotel Sukhumvit 15 Bangkok 47 Sukhumvit 15, Khwaeng Khlong Toei Nuea, Khlong Toei, Bangkok 10110": {
    contact: "+66 2 119 3100",
  },
  "Radisson Suites Bangkok Sukhumvit 23/2 Soi Sukhumvit 13, Khwaeng Khlong Toei Nuea, Khlong Toei, Bangkok 10110": {
    contact: "+66 2 645 4999",
  },
  "Novotel Bangkok Ploenchit Sukhumvit 566 Phloen Chit Rd, Khwaeng Lumphini, Pathum Wan, Bangkok 10330": {
    contact: "+66 2 305 6000",
  },
  "Pullman Bangkok Grande Sukhumvit Asoke 30 Sukhumvit, 21 Asok Montri Rd, Watthana, Bangkok 10110": {
    contact: "+66 2 204 4000",
  },
};

// if you're going to change it change it in backend too
export const SEPARATOR = "<$72$31$33$>";

const localPersonal = "thailand-personal-submit";
const localContact = "thailand-contact-submit";
const localPurpose = "thailand-purpose-submit";

function clearLocalStore() {
  localStorage.removeItem(localPersonal);
  localStorage.removeItem(localContact);
  localStorage.removeItem(localPurpose);
}

export function Thailand() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [_, setForm] = useState({});

  useAuth();

  const personal = useForm();
  const contact = useForm();
  const purpose = useForm();

  const number = personal.watch("passport-number") || {};
  const dateOfIssue = personal.watch("passport-date-of-issue");
  const address = purpose.watch("proposed-address-in-thailand");

  useEffect(() => {
    if ("value" in address && "label" in address && address.label in proposedAddressInThailandOptionsData) {
      purpose.setValue(
        "telephone-fax-of-thailand-guarantor",
        proposedAddressInThailandOptionsData[address.label].contact
      );
    }
  }, [address?.value]);

  useEffect(() => {
    if (dateOfIssue && !personal.getValues("passport-expire-date")) {
      const issue = new Date(dateOfIssue);
      issue.setFullYear(issue.getFullYear() + 10);
      issue.setDate(issue.getDate() - 1);

      personal.setValue("passport-expire-date", formatDateToYYYYMMDD(issue));
    }
  }, [dateOfIssue]);

  useEffect(() => {
    personal.setValue("type-of-visa-requested", typeOfVisaRequestedOptions[0]);
    personal.setValue("nationality", nationalityOptions[0]);
    personal.setValue("nationality-at-birth", nationalityOptions[0]);
    personal.setValue("passport-issued-at", placeOfBirthOptions[0]);
    personal.setValue("type-of-passport", "INT. PASSPORT");
    purpose.setValue("countries-for-which-travel-document-is-valid", validCountryOptions[0]);
    purpose.setValue("purpose-of-visit", purposeOfVisitOptions[0]);
    purpose.setValue("proposed-address-in-thailand", "HOTEL AMBASSADOR, SUKIMVIT, SOI-11, BANGKOK");
    contact.setValue("traveling-by", travelingByOptions[0]);
  }, []);

  useFormPersist(localPersonal, {
    watch: personal.watch,
    setValue: personal.setValue,
    storage: window.localStorage,
  });

  useFormPersist(localContact, {
    watch: contact.watch,
    setValue: contact.setValue,
    storage: window.localStorage,
  });

  useFormPersist(localPurpose, {
    watch: purpose.watch,
    setValue: purpose.setValue,
    storage: window.localStorage,
  });

  function personalSubmit(data) {
    data.occupation = `${data["present-position-occupation"]}${SEPARATOR}${data["name-of-employer-occupation"]}`;
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

    const serverRes = await axios.post("/api/visa-form/thailand", data).catch(console.log);
    if (!serverRes) return fire();

    fire("Successfully Done!", "success");

    setTimeout(clearLocalStore, 500);
    navigate(-1);
  }

  useEffect(() => {
    if (number.__isNew__ || !number.value) return;

    populate(number.value, (_value) => {
      const db = Object.assign(_value.common, _value.thailand);
      if (!db) return;

      setValue(
        getExactOption(typeOfVisaRequestedOptions, db["type_of_visa"]),
        (_v) => personal.setValue("type-of-visa-requested", _v),
        true
      );

      setValue(getExactOption(nameTitleOptions, db["name_title"]), (_v) => personal.setValue("name-title", _v), true);

      setValue(db["first_name"], (_v) => personal.setValue("first-name", _v));
      setValue(db["middle_name"], (_v) => personal.setValue("middle-name", _v));
      setValue(db["family_name"], (_v) => personal.setValue("last-name", _v));
      setValue(db["former_name"], (_v) => personal.setValue("former-name", _v));
      setValue(db["nationality"], (_v) => personal.setValue("nationality", _v), true);
      setValue(db["nationality_at_birth"], (_v) => personal.setValue("nationality-at-birth", _v), true);
      setValue(db["birth_place"], (_v) => personal.setValue("place-of-birth", _v), true);
      setValue(
        getExactOption(maritalStatusOptions, db["marital_status"]),
        (_v) => personal.setValue("marital-status", _v),
        true
      );
      setValue(db["date_of_birth"], (_v) => personal.setValue("date-of-birth", _v));
      setValue(db["passport_issued_at"], (_v) => personal.setValue("passport-issued-at", _v), true);
      setValue(db["passport_issue_date"], (_v) => personal.setValue("passport-date-of-issue", _v));
      setValue(db["passport_expiry_date"], (_v) => personal.setValue("passport-expire-date", _v));

      const [position, name] = db["occupation"]?.split(SEPARATOR) || [];
      setValue(position, (_v) => personal.setValue("present-position-occupation", _v));
      setValue(name, (_v) => personal.setValue("name-of-employer-occupation", _v));

      setValue(db["current_address"], (_v) => contact.setValue("current-address", _v));
      setValue(db["phone"], (_v) => contact.setValue("telephone", _v));
      setValue(db["permanent_address"], (_v) => contact.setValue("permanent-address", _v));
      setValue(db["email"], (_v) => contact.setValue("email", _v));
      setValue(db["permanent_phone"], (_v) => contact.setValue("permanent-telephone", _v));
    });
  }, [number.value]);

  return (
    <main className="container mx-auto space-y-4 p-4">
      <button
        onClick={() => {
          navigate(-1);
          setTimeout(clearLocalStore, 500);
        }}
        disabled={contact.formState.isSubmitting || personal.formState.isSubmitting || purpose.formState.isSubmitting}
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
              <AsyncSelect
                label="Passport Number *"
                placeholder="Select passport number"
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

              <Input
                label="Type of Travel Document *"
                placeholder="Passport type"
                register={personal.register("type-of-passport", { required: "Type of travel document is required" })}
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

              <div>
                <label className="text-base font-medium text-gray-800 line-clamp-1">
                  Occupation (Present Position, Name Of Employer) *
                </label>
                <div className="flex gap-2 [&>*]:flex-1">
                  <Input
                    placeholder="Current Designation"
                    register={personal.register("present-position-occupation", {
                      required: "Current designation is required",
                    })}
                    error={personal.formState.errors["present-position-occupation"]}
                  />
                  <Input
                    placeholder="Name of Organization"
                    register={personal.register("name-of-employer-occupation", {
                      required: "Name of organization is required",
                    })}
                    error={personal.formState.errors["name-of-employer-occupation"]}
                  />
                </div>
              </div>
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
                label="Flight No Or Vessel's Name *"
                register={contact.register("flight_no_or_vessel_name", {
                  required: "Flight no or vessel's name is required",
                })}
                error={contact.formState.errors["flight_no_or_vessel_name"]}
              />

              <Input
                label="Duration Of Proposed Stay *"
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
                label="Date Of Previous Visit To Thailand"
                register={purpose.register("date-of-previous-visit")}
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

              <Select
                label="Proposed Address In Thailand *"
                placeholder="Select address"
                control={purpose.control}
                name="proposed-address-in-thailand"
                options={proposedAddressInThailandOptions}
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
                label="Name And Address Of Guarantor In Thailand"
                register={purpose.register("name-and-address-of-guarantor-in-thailand")}
                error={purpose.formState.errors["name-and-address-of-guarantor-in-thailand"]}
              />

              <Input
                label="Telephone/Fax Of Thailand Guarantor"
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
