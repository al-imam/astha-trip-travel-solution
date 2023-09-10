import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { StepIndicator } from "components/form/StepIndicator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import countries from "../countries.json";
import { Select } from "components/form/Select";

const countriesOptions = countries.map((e) => ({
  label: e.name,
  value: e.name.toUpperCase(),
}));

export function Schengen() {
  const personal = useForm({ mode: "onSubmit" });
  const [step, setStep] = useState(1);

  console.log(personal.formState.errors);

  return (
    <main className="container mx-auto space-y-4 p-4">
      <Link to="/agent" className="flex w-max items-center rounded bg-brand-500 px-3 py-2 text-white">
        <span className="pr-2 text-2xl">
          <LeftArrow />
        </span>
        Back to dashboard
      </Link>

      <div className="space-y-4 rounded border border-gray-200 bg-white px-4 py-8 shadow-sm ">
        <StepIndicator steps={["Personal", "Travel Document", "Contact and Occupation"]} current={step} />

        {step === 1 && (
          <form className="space-y-4" onSubmit={personal.handleSubmit(() => setStep(2))}>
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

function NextIcon(props) {
  return (
    <svg
      className="ml-2 h-3.5 w-3.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
      {...props}
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
