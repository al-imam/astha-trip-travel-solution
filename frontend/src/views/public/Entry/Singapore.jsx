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

export function Singapore() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const particularsOfApplicant = useForm();

  const citizenshipOfSpouse = particularsOfApplicant.watch("citizenship-of-spouse");

  const isSpouseIsSingaporeCitizen = citizenshipOfSpouseOptions.some(
    (c) => citizenshipOfSpouse && c.value === citizenshipOfSpouse.value
  );

  useFormPersist("personal-visa-data-singapore", {
    watch: particularsOfApplicant.watch,
    setValue: particularsOfApplicant.setValue,
    storage: window.sessionStorage,
  });

  function personalSubmit(data) {
    console.log(data);
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
            onSubmit={particularsOfApplicant.handleSubmit(personalSubmit)}
            autoComplete="off"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Name (Full name as shown in travel document) *"
                placeholder="Name"
                register={particularsOfApplicant.register("surname", {
                  required: "Name is required",
                  maxLength: { value: 50, message: "Name must've with in 50 character!" },
                })}
                error={particularsOfApplicant.formState.errors["surname"]}
              />

              <Input
                label="Alias *"
                register={particularsOfApplicant.register("alias", {
                  required: "Alias is required",
                  maxLength: { value: 50, message: "Alias must've with in 50 character!" },
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
                    maxLength: { value: 9, message: "NRIC no must've with in 9 character!" },
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
                  maxLength: { value: 15, message: "Passport no must've with in 15 character!" },
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
                    message: "Place/Country of Issue must've with in 25 character!",
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
                    message: "PRC ID Number must've with in 25 character!",
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
                  required: "Prefecture of Origin/Residence is required",
                  maxLength: {
                    value: 25,
                    message: "Prefecture of Origin/Residence must've with in 25 character!",
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
      </div>
    </main>
  );
}
