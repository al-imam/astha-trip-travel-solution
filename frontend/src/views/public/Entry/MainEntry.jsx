import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { Select, SelectNotCreatable } from "components/form/Select";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const guestTypeOptions = ["Single", "Family"].map((value) => ({
  value,
  label: value,
}));

const passportTypeOptions = ["Ordinary", "Diplomatic", "Service", "Official", "Special"].map((value) => ({
  value: `${value} passport`,
  label: `${value} passport`,
}));

const countryOptions = ["Singapore", "Vietnam"].map((value) => ({
  value,
  label: value,
}));

const hotelNameOptions = [
  "Hilton singapore orchard",
  "Galaxy pods @ chinatown",
  "Holiday inn express singapore",
  "Ibis singapore on bencoolen",
  "Swissotel the stamford",
  "V hotel bencoolen",
  "Parkroyal collection marina bay, singapore",
  "Sofitel singapore sentosa resort & spa",
  "Sofitel singapore city centre",
  "Strand hotel singapore",
  "AM hotel",
  "Pan pacific orchard",
  "Value hotel thomson",
].map((value) => ({
  value,
  label: value,
}));

const guestNumbersOptions = Array(8)
  .fill(null)
  .map((_, index) => ({
    value: `${index + 2}`,
    label: `${index + 2}`,
  }));

export function MainEntry() {
  const guest = useForm();
  const guestType = guest.watch("guest-type");

  console.log(guest.formState.errors);

  useEffect(() => {
    guest.setValue("guest-type", guestTypeOptions[0]);
    guest.setValue("guest-number", guestNumbersOptions[0]);
    guest.setValue("country", countryOptions[0]);
  }, []);

  function submitGuest(data) {
    console.log(data);
  }

  return (
    <main className="container mx-auto space-y-4 p-4">
      <div className="mr-4 flex items-center justify-between">
        <Link
          to="/agent"
          className="inline-flex items-center rounded-md border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-blue-700 shadow hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 "
        >
          <NextIcon className="mr-2 scale-x-[-1]" />
          <span>
            <span className="hidden md:inline"> Back to </span>dashboard
          </span>
        </Link>
        <div className="ml-auto grid grid-cols-[1fr_auto_auto] text-base text-gray-800 [column-gap:0.5rem]">
          <span>Remaining Balance</span> - <span>8900</span>
          <span>Submission Rate</span> - <span>100</span>
        </div>
      </div>

      <div className="space-y-4 rounded border border-gray-200 bg-white px-4 py-8 shadow-sm ">
        <form name="add-guest" className="space-y-4" onSubmit={guest.handleSubmit(submitGuest)}>
          <div className="flex flex-col gap-1 text-gray-800  sm:flex-row sm:gap-4 [&>*]:flex-1">
            <div className="flex items-center gap-2 text-lg md:text-2xl ">
              <AddIcon /> Entry LOI Request
            </div>
            <div className=" ">
              <SelectNotCreatable
                options={countryOptions}
                placeholder="Select country"
                control={guest.control}
                name="country"
                isSearchable={false}
                register={guest.register("country", { required: "Country is required" })}
                error={guest.formState.errors["country"]}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Surname *"
              placeholder="Surname"
              register={guest.register("surname", { required: "Surname is required" })}
              error={guest.formState.errors["surname"]}
            />

            <Input
              label="First name *"
              placeholder="First name"
              register={guest.register("first-name", { required: "First name is required" })}
              error={guest.formState.errors["first-name"]}
            />

            <Input
              label="Surname at birth"
              register={guest.register("surname-at-birth")}
              error={guest.formState.errors["surname-at-birth"]}
            />
            <div className="flex gap-4 [&>*]:flex-1">
              <SelectNotCreatable
                label="Guest type *"
                options={guestTypeOptions}
                placeholder="Select guest type"
                control={guest.control}
                name="guest-type"
                isSearchable={false}
                register={guest.register("guest-type", { required: "Guest type is required" })}
                error={guest.formState.errors["guest-type"]}
              />

              {guestType?.value.toLowerCase() === "family" && (
                <SelectNotCreatable
                  label="Guests *"
                  options={guestNumbersOptions}
                  placeholder="Select guest number"
                  control={guest.control}
                  name="guest-number"
                  isSearchable={false}
                  register={guest.register("guest-number", { required: "Guest number is required" })}
                  error={guest.formState.errors["guest-number"]}
                />
              )}
            </div>

            <Input
              label="Passport number *"
              placeholder="Passport number"
              register={guest.register("passport-number", { required: "Passport number is required" })}
              error={guest.formState.errors["passport-number"]}
            />

            <Select
              label="Type of passport *"
              options={passportTypeOptions}
              control={guest.control}
              placeholder="Select passport type"
              name="passport-type"
              register={guest.register("passport-type", { required: "Passport type is required" })}
              error={guest.formState.errors["passport-type"]}
            />

            <Input
              label="Travel date *"
              register={guest.register("travel-date", { required: "Travel date is required" })}
              error={guest.formState.errors["travel-date"]}
              type="date"
            />

            <Input
              label="Passport issue date *"
              register={guest.register("passport-issue-date", { required: "Passport issue date is required" })}
              error={guest.formState.errors["passport-issue-date"]}
              type="date"
            />

            <Input
              label="Passport valid until date *"
              register={guest.register("passport-valid-until-date", {
                required: "Passport valid until date is required",
              })}
              error={guest.formState.errors["passport-valid-until-date"]}
              type="date"
            />

            <Input
              label="Phone number *"
              placeholder="Phone number"
              register={guest.register("phone-number", {
                required: "Phone number is required",
              })}
              error={guest.formState.errors["phone-number"]}
            />

            <Select
              label="Hotel name *"
              options={hotelNameOptions}
              control={guest.control}
              placeholder="Select hotel name"
              name="hotel-name"
              register={guest.register("hotel-name", { required: "Hotel name is required" })}
              error={guest.formState.errors["hotel-name"]}
            />

            <Input
              label="Passport copy (image, pdf) *"
              register={guest.register("passport-copy", {
                required: "Passport copy is required",
              })}
              error={guest.formState.errors["passport-copy"]}
              type="file"
              accept=".pdf, image/*"
              multiple={false}
            />

            <Input
              label="Visa copy (image, pdf) *"
              register={guest.register("visa-copy", {
                required: "Visa copy is required",
              })}
              error={guest.formState.errors["visa-copy"]}
              type="file"
              accept=".pdf, image/*"
              multiple={false}
            />

            <Input
              label="Hotel booking copy (image, pdf) *"
              register={guest.register("hotel-copy", {
                required: "Hotel copy is required",
              })}
              error={guest.formState.errors["hotel-copy"]}
              type="file"
              accept=".pdf, image/*"
              multiple={false}
            />

            <Input
              label="Ticket copy (image, pdf) *"
              register={guest.register("ticket-copy", {
                required: "Ticket copy is required",
              })}
              error={guest.formState.errors["ticket-copy"]}
              type="file"
              accept=".pdf, image/*"
              multiple={false}
            />
          </div>

          <div>
            <Button>
              Add New Guest <AddIcon className="ml-1 text-lg" />
            </Button>
          </div>
        </form>
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

export function AddIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11 13H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.713-.288T11 18v-5Z"
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

export default MainEntry;
