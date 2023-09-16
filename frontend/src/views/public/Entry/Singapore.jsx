import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { Select, SelectNotCreatable } from "components/form/Select";
import { StepIndicator } from "components/form/StepIndicator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useNavigate } from "react-router-dom";
import countries from "../countries.json";
import districts from "../districts.json";
import races from "../races.json";
import { Group, Join } from "components/form/Group";
import { NextIcon } from "./Schengen";

const countriesOptions = countries.map((e) => ({
  label: e.name,
  value: e.nationality,
}));

const stateOfBirthOptions = districts.map((value) => ({
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

const academicOptions = ["No Formal Education", "Primary", "Secondary", "Pre-University"].map((value) => ({
  label: value,
  value,
}));

const qualificationsAttainedOptions = ["Diploma", "University", "Post-Graduate"].map((value) => ({
  label: value,
  value,
}));

const typeOfVisaOptions = ["Single Journey", "Double Journey", "Triple Journey", "Multiple Journey"].map((value) => ({
  label: value,
  value,
}));

const stayLocationOptions = ["Next of Kin's Place", "Relative's Place", "Friend's Place", "Hotel"].map((value) => ({
  label: value,
  value,
}));

const steps = ["", "", "", ""];

export function Singapore() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const particularsOfApplicant = useForm();
  const otherDetails = useForm();

  const citizenshipOfSpouse = particularsOfApplicant.watch("citizenship-of-spouse");

  const isStayingMoreThanThirtyDays = otherDetails.watch("days-intend-to-stay") === "More than 30 days";
  const isSpouseIsSingaporeCitizen = citizenshipOfSpouseOptions.some(
    (c) => citizenshipOfSpouse && c.value === citizenshipOfSpouse.value
  );

  useFormPersist("personal-visa-data-singapore", {
    watch: particularsOfApplicant.watch,
    setValue: particularsOfApplicant.setValue,
    storage: window.sessionStorage,
  });

  function particularsOfApplicantSubmit(data) {
    console.log(data);
    setStep(2);
  }

  function otherDetailsSubmit(data) {
    console.log(data);
    setStep(3);
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
            name="particulars_of_applicant"
            className="space-y-4"
            onSubmit={particularsOfApplicant.handleSubmit(particularsOfApplicantSubmit)}
            autoComplete="off"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Name (Full name as shown in travel document) *"
                placeholder="Name"
                register={particularsOfApplicant.register("surname", {
                  required: "Name is required",
                  maxLength: { value: 50, message: "Exceeds 50 character limit" },
                })}
                error={particularsOfApplicant.formState.errors["surname"]}
              />

              <Input
                label="Alias *"
                register={particularsOfApplicant.register("alias", {
                  required: "Alias is required",
                  maxLength: { value: 50, message: "Exceeds 50 character limit" },
                })}
                error={particularsOfApplicant.formState.errors["alias"]}
              />

              <Input
                label="Date of birth *"
                register={particularsOfApplicant.register("date-of-birth", {
                  required: "Birth date is required",
                  max: { value: new Date().toISOString().split("T")[0], message: "Birth date cannot be future date" },
                })}
                error={particularsOfApplicant.formState.errors["date-of-birth"]}
                type="date"
              />

              <SelectNotCreatable
                label="Sex (gender) *"
                options={sexesOptions}
                placeholder="Select your gender"
                control={particularsOfApplicant.control}
                name="sex"
                isSearchable={false}
                register={particularsOfApplicant.register("sex", { required: "Sex (gender) is required" })}
                error={particularsOfApplicant.formState.errors["sex"]}
              />

              <SelectNotCreatable
                label="Marital Status *"
                options={maritalStatusOptions}
                control={particularsOfApplicant.control}
                name="marital-status"
                placeholder="Select marital status"
                isSearchable={false}
                register={particularsOfApplicant.register("marital-status", { required: "Marital status is required" })}
                error={particularsOfApplicant.formState.errors["marital-status"]}
              />

              <Select
                label="Ationality/Citizenship of Spouse *"
                placeholder="Select Ationality/Citizenship"
                name="citizenship-of-spouse"
                options={citizenshipOfSpouseOptions}
                control={particularsOfApplicant.control}
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
                label="Country/place of birth *"
                options={countriesOptions}
                control={particularsOfApplicant.control}
                placeholder="Select country of birth"
                name="country-of-birth"
                register={particularsOfApplicant.register("country-of-birth", {
                  required: "Country/place of birth is required",
                })}
                error={particularsOfApplicant.formState.errors["country-of-birth"]}
              />

              <Select
                label="State/province of birth *"
                options={stateOfBirthOptions}
                control={particularsOfApplicant.control}
                placeholder="Select state of birth"
                name="state-of-birth"
                register={particularsOfApplicant.register("state-of-birth", {
                  required: "State/province of birth is required",
                })}
                error={particularsOfApplicant.formState.errors["state-of-birth"]}
              />

              <Select
                label="Race: (e.g. Malay, Indian, etc) *"
                options={racesOptions}
                control={particularsOfApplicant.control}
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
                name="nationality"
                register={particularsOfApplicant.register("nationality", {
                  required: "Nationality/Citizenship is required",
                })}
                error={particularsOfApplicant.formState.errors["nationality"]}
              />

              <Select
                label="Type of passport *"
                placeholder="Select passport type"
                options={documentTypeOptions}
                control={particularsOfApplicant.control}
                name="type-of-passport"
                register={particularsOfApplicant.register("type-of-passport", {
                  required: "Type of passport is required",
                })}
                error={particularsOfApplicant.formState.errors["type-of-passport"]}
              />

              <Input
                label="Passport no *"
                register={particularsOfApplicant.register("passport-no", {
                  required: "Passport no is required",
                  maxLength: { value: 15, message: "Exceeds 15 character limit" },
                })}
                error={particularsOfApplicant.formState.errors["passport-no"]}
              />

              <Input
                label="Passport issue date *"
                register={particularsOfApplicant.register("passport-issue-date", {
                  required: "Passport issue date no is required",
                })}
                error={particularsOfApplicant.formState.errors["passport-issue-date"]}
                type="date"
              />

              <Input
                label="Passport expiry date *"
                register={particularsOfApplicant.register("passport-expiry-date", {
                  required: "Passport expiry date no is required",
                })}
                error={particularsOfApplicant.formState.errors["passport-expiry-date"]}
                type="date"
              />

              <Input
                label="Place/Country of Issue *"
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
                label="Country/Place of Origin/Residence *"
                placeholder="Select country"
                options={countriesOptions}
                control={particularsOfApplicant.control}
                name="residence"
                register={particularsOfApplicant.register("residence", {
                  required: "Country/Place of Origin/Residence is required",
                })}
                error={particularsOfApplicant.formState.errors["residence"]}
              />

              <Select
                label="Division/State of Origin/Residence *"
                placeholder="Select state"
                options={stateOfBirthOptions}
                control={particularsOfApplicant.control}
                name="state-of-residence"
                register={particularsOfApplicant.register("state-of-residence", {
                  required: "Division/State of Origin/Residence is required",
                })}
                error={particularsOfApplicant.formState.errors["state-of-residence"]}
              />

              <Input
                label="Prefecture of Origin/Residence *"
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
            </div>

            <div className="flex justify-end">
              <Button>
                Next <NextIcon className="ml-2" />
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                label="Contact number *"
                register={otherDetails.register("contact-number", {
                  required: "Contact number is required",
                  pattern: { value: /^(\+\d{1,})?(\d+)$/, message: "Contact number is not valid" },
                  maxLength: { value: 25, message: "Exceeds 25 character limit" },
                })}
                error={otherDetails.formState.errors["contact-number"]}
              />

              <Input
                label="Occupation *"
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
                name="highest-academic"
                placeholder="Select Highest Academic"
                isSearchable={false}
                register={otherDetails.register("highest-academic", {
                  required: "Highest Academic/Professional is required",
                })}
                error={otherDetails.formState.errors["highest-academic"]}
              />

              <SelectNotCreatable
                label="Qualifications Attained *"
                options={qualificationsAttainedOptions}
                control={otherDetails.control}
                name="qualifications-attained"
                placeholder="Select Qualifications Attained"
                isSearchable={false}
                register={otherDetails.register("qualifications-attained", {
                  required: "Qualifications Attained is required",
                })}
                error={otherDetails.formState.errors["qualifications-attained"]}
              />

              <Input
                label="Annual Income in Singapore dollars (SGD) *"
                register={otherDetails.register("annual-income", {
                  required: "Annual Income is required",
                  pattern: { value: /^\d+$/, message: "Annual Income is not valid (only number)" },
                  maxLength: { value: 11, message: "Exceeds 11 character limit" },
                })}
                error={otherDetails.formState.errors["annual-income"]}
              />

              <Input
                label="Religion *"
                register={otherDetails.register("religion", {
                  required: "Religion is required",
                  maxLength: { value: 25, message: "Exceeds 25 character limit" },
                })}
                error={otherDetails.formState.errors["religion"]}
              />

              <Input
                label="Expected Date of Arrival in Singapore *"
                register={otherDetails.register("arrival-date", {
                  required: "Date of Arrival in Singapore is required",
                })}
                error={otherDetails.formState.errors["arrival-date"]}
                type="date"
              />

              <SelectNotCreatable
                label="Type of Visa *"
                options={typeOfVisaOptions}
                control={otherDetails.control}
                name="type-of-visa"
                placeholder="Select Type of Visa"
                isSearchable={false}
                register={otherDetails.register("type-of-visa", {
                  required: "Type of Visa is required",
                })}
                error={otherDetails.formState.errors["type-of-visa"]}
              />

              <SelectNotCreatable
                label="Purpose of visit *"
                options={purposeOfVisitOptions}
                control={otherDetails.control}
                name="purpose-of-visit"
                placeholder="Select purpose of visit"
                isSearchable={false}
                register={otherDetails.register("purpose-of-visit", {
                  required: "Purpose of visit is required",
                })}
                error={otherDetails.formState.errors["purpose-of-visit"]}
              />

              <Input
                label="Details of purpose"
                register={otherDetails.register("details-of-purpose")}
                error={otherDetails.formState.errors["details-of-purpose"]}
              />

              <Select
                label="Where will you be staying in Singapore? *"
                placeholder="Select location"
                name="stay-location"
                options={stayLocationOptions}
                control={otherDetails.control}
                register={otherDetails.register("stay-location", {
                  required: "Stay location is required",
                })}
                error={otherDetails.formState.errors["stay-location"]}
              />

              <Group
                options={["Less than 30 days", "More than 30 days"]}
                legend="How long do you intend to stay in Singapore *"
                classNameContainer="col-span-full"
                checked="Less than 30 days"
                register={otherDetails.register("days-intend-to-stay", { required: "Answer the question" })}
                error={otherDetails.formState.errors["days-intend-to-stay"]}
                isOpen={isStayingMoreThanThirtyDays}
              >
                <Input
                  label="If your intended stay in Singapore is more than 30 days, please state the reason for your intended length of stay and the duration"
                  classNameLabel="line-clamp-none"
                  placeholder="Describe why ..."
                  register={otherDetails.register("reason-for-stay")}
                  error={otherDetails.formState.errors["reason-for-stay"]}
                />
              </Group>

              <Join
                legend="Address in Singapore"
                classNameContainer="col-span-full"
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:flex xl:flex-wrap xl:[&>*]:flex-1"
              >
                <Input
                  label="Block/House no *"
                  register={otherDetails.register("singapore-house-no", {
                    required: "Block/House no is required",
                    maxLength: { value: 5, message: "Exceeds 5 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-house-no"]}
                />

                <Input
                  label="Floor no *"
                  register={otherDetails.register("singapore-floor-no", {
                    required: "Floor no is required",
                    maxLength: { value: 2, message: "Exceeds 2 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-floor-no"]}
                />

                <Input
                  label="Unit no *"
                  register={otherDetails.register("singapore-unit-no", {
                    required: "Unit no is required",
                    maxLength: { value: 4, message: "Exceeds 4 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-unit-no"]}
                />

                <Input
                  label="Postal code *"
                  register={otherDetails.register("singapore-postal-code", {
                    required: "Postal code is required",
                    maxLength: { value: 4, message: "Exceeds 4 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-postal-code"]}
                />

                <Input
                  label="Street name *"
                  register={otherDetails.register("singapore-street-name", {
                    required: "Street name is required",
                    maxLength: { value: 20, message: "Exceeds 20 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-street-name"]}
                />
                <Input
                  label="Contact no *"
                  register={otherDetails.register("singapore-contact-no", {
                    required: "Contact no is required",
                    maxLength: { value: 20, message: "Exceeds 20 character limit" },
                  })}
                  error={otherDetails.formState.errors["singapore-contact-no"]}
                />

                <div className="col-span-full md:col-span-2">
                  <Input
                    label="Building name *"
                    register={otherDetails.register("singapore-building-name", {
                      required: "Building name is required",
                    })}
                    error={otherDetails.formState.errors["singapore-building-name"]}
                  />
                </div>
              </Join>
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
