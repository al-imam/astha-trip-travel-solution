import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { Select } from "components/form/Select";
import { StepIndicator } from "components/form/StepIndicator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import countries from "../countries.json";

const countriesOptions = countries.map((e) => ({
  label: e.name,
  value: e.name.toUpperCase(),
}));

const steps = ["Personal", "Travel Document", "Contact and Occupation"];

export function Schengen() {
  const personal = useForm();
  const travel = useForm();
  const [step, setStep] = useState(1);

  const clearPersonal = useFormPersist("personal-visa-data", {
    watch: personal.watch,
    setValue: personal.setValue,
    storage: window.localStorage,
    validate: true,
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
          <form className="space-y-4" onSubmit={personal.handleSubmit(personalInfoSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Surname"
                register={personal.register("surname", { required: "Surname is required" })}
                error={personal.formState.errors["surname"]}
                type="text"
              />

              <Input
                label="Surname at birth"
                register={personal.register("surname-at-birth", { required: "Surname at birth is required" })}
                error={personal.formState.errors["surname-at-birth"]}
                type="text"
              />

              <Input
                label="Fist name"
                register={personal.register("first-name", { required: "Fist name is required" })}
                error={personal.formState.errors["first-name"]}
                type="text"
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
                type="text"
              />

              <Select
                label="Country of birth"
                options={countriesOptions}
                control={personal.control}
                name="country-of-birth"
                register={personal.register("country-of-birth", { required: "Country of birth is required" })}
                error={personal.formState.errors["country-of-birth"]}
              />
            </div>

            <div className="flex justify-end">
              <Button>
                Next <NextIcon />
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-4" onSubmit={travel.handleSubmit(travelInfoSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Surname"
                register={travel.register("surname", { required: "Surname is required" })}
                error={travel.formState.errors["surname"]}
                type="text"
              />

              <Input
                label="Surname at birth"
                register={travel.register("surname-at-birth", { required: "Surname at birth is required" })}
                error={travel.formState.errors["surname-at-birth"]}
                type="text"
              />

              <Input
                label="Fist name"
                register={travel.register("first-name", { required: "Fist name is required" })}
                error={travel.formState.errors["first-name"]}
                type="text"
              />

              <Input
                label="Date of birth"
                register={travel.register("date-of-birth", {
                  required: "Birth date is required",
                  max: { value: new Date().toISOString().split("T")[0], message: "Birth date cannot be future date" },
                })}
                error={travel.formState.errors["date-of-birth"]}
                type="date"
              />
              <Input
                label="Place of birth"
                register={travel.register("place-of-birth", { required: "Place of birth is required" })}
                error={travel.formState.errors["place-of-birth"]}
                type="text"
              />

              <Select
                label="Country of birth"
                options={countriesOptions}
                control={travel.control}
                name="country-of-birth"
                register={travel.register("country-of-birth", { required: "Country of birth is required" })}
                error={travel.formState.errors["country-of-birth"]}
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
