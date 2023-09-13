import axios from "axios";
import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { Select, SelectNotCreatable } from "components/form/Select";
import { useAuth } from "hook/useAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { v4 as uuid } from "uuid";
import { Table } from "./Table";

const guestTypeOptions = ["Single", "Family"].map((value) => ({
  value,
  label: value,
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

function getNumberSelect(start, end) {
  const resultArray = [];

  for (let i = start; i <= end; i++) {
    resultArray.push({
      value: `${i}`,
      label: `${i}`,
    });
  }

  return resultArray;
}

const guestNumbersOptions = getNumberSelect(2, 9);

function valueAndLabel(array) {
  return array.map((value) => ({
    value,
    label: value,
  }));
}

function getFromAndTo(name) {
  return {
    from: valueAndLabel([
      "AirPort",
      `${name} to Market`,
      `${name} to Marina Bay Sands`,
      `${name} to Sentosa Theme Park`,
      `${name} to Universal Studios`,
      `${name} to Hop-On Hop-Off Sightseeing Bus Tour`,
      `${name} to S.E.A. Aquarium Entrance`,
      `${name} to Art Science Museum`,
      `${name} to Flyer & Gardens by the Bay`,
      `${name} to Sentosa Mega Adventure Park`,
      `${name} to National Gallery`,
      `${name} to Full-Day City Tour`,
      `${name}`,
    ]),
    to: valueAndLabel([
      `Hotel ${name}`,
      "AirPort",
      `City Tour`,
      `Market to ${name}`,
      `Marina Bay Sands to ${name}`,
      `Universal Studios to ${name}`,
      `Sentosa Theme Park to ${name}`,
      `Hop-On Hop-Off Sightseeing Bus Tour to ${name}`,
      `S.E.A. Aquarium Entrance to ${name}`,
      `Art Science Museum to ${name}`,
      `Flyer & Gardens by the Bay to ${name}`,
      `Sentosa Mega Adventure Park to ${name}`,
      `National Gallery to ${name}`,
      `Full-Day City Tour to ${name}`,
    ]),
  };
}

function getNumberByType(num, type) {
  if (type?.toLowerCase() === "single") return 1;
  return parseInt(num) || 1;
}

export function MainEntry() {
  const guest = useForm();
  const itenary = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  const [allGuest, setAllGuest] = useState([]);
  const [itenaries, setItenaries] = useState([]);
  const [locations, setLocations] = useState({ from: [], to: [] });
  const [familyMemberOptions, setFamilyMemberOptions] = useState(guestNumbersOptions);

  const guestType = guest.watch("guest-type");
  const hotelName = guest.watch("hotel-name");
  const guestNumber = guest.watch("guest-number");
  const numberOfGuest = getNumberByType(guestNumber?.value, guestType?.value);

  const disableGlobalInputs = allGuest.length > 0;

  useEffect(() => {
    const next = getFromAndTo(hotelName?.value);

    const fromValue = itenary.getValues("from");
    const toValue = itenary.getValues("to");
    const indexOfFrom = locations.from.findIndex((f) => fromValue && f.value === fromValue.value);
    const indexOfTo = locations.to.findIndex((f) => toValue && f.value === toValue.value);

    setLocations(next);

    itenary.setValue("to", indexOfTo !== -1 ? next.to[indexOfTo] : null);
    itenary.setValue("from", indexOfFrom !== -1 ? next.from[indexOfFrom] : null);
  }, [hotelName]);

  useEffect(() => {
    guest.setValue("guest-type", guestTypeOptions[0]);
    guest.setValue("guest-number", guestNumbersOptions[0]);
    guest.setValue("country", countryOptions[0]);
  }, []);

  async function submitGuest(data) {
    if (allGuest.length >= numberOfGuest) return;

    if (!auth.admin) {
      const balance = parseInt(auth.agent.balance) || 0;
      const rate = parseInt(auth.agent.rate) || 100;

      if (balance <= rate * allGuest.length) {
        return toast.error("Your balance is low please add balance");
      }
    }

    const form = new FormData();
    form.append("imgpasport", data["passport-copy"][0]);
    form.append("imgvisa", data["visa-copy"][0]);
    form.append("hotel", data["hotel-copy"][0]);
    form.append("ticket", data["ticket-copy"][0]);

    try {
      const res = await toast.promise(axios.post("/temp/guestlist/photoupload", form), {
        pending: "Photo Uploading wait ...",
        success: "added to list",
        error: {
          render({ data }) {
            if (data.response.status === 406) {
              return <p className="text-sm">{data.response?.data}</p>;
            }
            return "Something is wrong!";
          },
        },
      });

      const start = allGuest.length < 2 ? 2 : allGuest.length + 1;
      setFamilyMemberOptions(getNumberSelect(start, 9));
      setAllGuest((prev) => [
        ...prev,
        {
          guestName: data["guest-name"],
          passportNumber: data["passport-number"],
          travelDate: data["travel-date"],
          hotelName: data["hotel-name"].value,
          passportPhoto: res.data.passpor.name || null,
          visaPhoto: res.data.visa.name || null,
          hotelbooking: res.data.hotelbooking.name || null,
          ticket: res.data.tiket.name || null,
          country: data["country"].value,
          id: uuid(),
        },
      ]);

      guest.setValue("passport-number", "");
      guest.setValue("guest-name", "");
      guest.setValue("visa-copy", "");
      guest.setValue("hotel-copy", "");
      guest.setValue("passport-copy", "");
      guest.setValue("ticket-copy", "");
    } catch {}
  }

  function submitItenary(data) {
    const obj = {};
    for (const key in data) {
      if (data[key] instanceof Object) {
        if ("label" in data[key] && "value" in data[key]) {
          obj[key] = data[key].value;
        }

        continue;
      }

      obj[key] = data[key];
    }

    obj.id = uuid();
    setItenaries((prev) => [...prev, obj]);
    itenary.reset();
  }

  const isValid = Object.keys(itenary.formState.errors).length > 0;

  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <div className="mr-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="my-1 inline-flex items-center rounded-md border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-blue-700 shadow hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 "
        >
          <NextIcon className="mr-2 scale-x-[-1]" />
          <span>
            <span className="hidden md:inline"> Back to </span>dashboard
          </span>
        </button>
        {!auth.isLoading && auth.agent && (
          <div className="ml-auto grid grid-cols-[1fr_auto_auto] text-base text-gray-800 [column-gap:0.5rem]">
            {console.log(auth.agent)}
            <span>Remaining Balance</span> - <span>{auth.agent.balance}</span>
            <span>Submission Rate</span> - <span>{auth.agent.rate}</span>
          </div>
        )}
      </div>

      <div className="space-y-4 rounded border border-gray-200 bg-white px-4 py-8 shadow-sm ">
        <form name="add-guest" className="space-y-4" onSubmit={guest.handleSubmit(submitGuest)}>
          <div className="flex flex-col gap-1 text-gray-800  sm:flex-row sm:gap-4 [&>*]:flex-1">
            <div className="flex items-center gap-2 text-lg md:text-2xl ">
              <AddIcon /> Entry LOI Request
            </div>

            <SelectNotCreatable
              options={countryOptions}
              placeholder="Select country"
              isDisabled={disableGlobalInputs}
              control={guest.control}
              name="country"
              isSearchable={false}
              register={guest.register("country", { required: "Country is required" })}
              error={guest.formState.errors["country"]}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Guest Name *"
              placeholder="Guest name"
              register={guest.register("guest-name", { required: "Surname is required" })}
              error={guest.formState.errors["guest-name"]}
            />

            <Input
              label="Passport number *"
              placeholder="Passport number"
              register={guest.register("passport-number", {
                required: "Passport number is required",
                validate(value) {
                  if (allGuest.findIndex((g) => g["passportNumber"].toLowerCase() === value?.toLowerCase()) !== -1) {
                    return "Passport number already added";
                  }
                },
              })}
              error={guest.formState.errors["passport-number"]}
            />

            <div className="flex gap-4 [&>*]:flex-1">
              <SelectNotCreatable
                label="Guest type *"
                options={guestTypeOptions}
                placeholder="Select guest type"
                control={guest.control}
                name="guest-type"
                isDisabled={allGuest.length > 1}
                isSearchable={false}
                register={guest.register("guest-type", { required: "Guest type is required" })}
                error={guest.formState.errors["guest-type"]}
              />

              {guestType?.value.toLowerCase() === "family" && (
                <SelectNotCreatable
                  label="Guests *"
                  options={familyMemberOptions}
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
              label="Travel date *"
              disabled={disableGlobalInputs}
              register={guest.register("travel-date", { required: "Travel date is required" })}
              error={guest.formState.errors["travel-date"]}
              type="date"
            />

            <Select
              label="Hotel name *"
              options={hotelNameOptions}
              control={guest.control}
              isDisabled={disableGlobalInputs}
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

          {allGuest.length < numberOfGuest ? (
            <div>
              <Button>
                Continue <AddIcon className="ml-1 text-lg" />
              </Button>
            </div>
          ) : (
            <p className="py-2 text-lg font-medium text-gray-900">Specified maximum guests added ({numberOfGuest})</p>
          )}
        </form>
      </div>

      {allGuest.length > 0 && (
        <div className="mt-4 space-y-4 rounded border border-gray-200 bg-white px-4 py-8 shadow-sm ">
          <p className="flex items-center gap-2 py-2 text-2xl font-semibold text-gray-900 ">
            <PersonIcon className="text-xl" />
            List of guests ({allGuest.length})
          </p>
          <Table
            hide={[3]}
            head={["Guest name", "Passport number", "Travel date", "Hotel name", "Action"]}
            body={allGuest.map((value) => [
              value["guestName"],
              value["passportNumber"],
              value["travelDate"],
              value["hotelName"],

              <button
                title="delete"
                onClick={() => {
                  setAllGuest((prev) => prev.filter((g) => g["passportNumber"] !== value["passportNumber"]));
                }}
                className="flex items-center justify-center rounded text-red-500/95 hover:scale-105 hover:text-red-600"
              >
                <DeleteIcon className="text-lg" />
              </button>,
            ])}
          />
        </div>
      )}

      {allGuest.length > 0 && (
        <div className="mt-4 flex flex-col gap-4 rounded border border-gray-200 bg-white px-4 py-8 shadow-sm ">
          <p className="flex items-center gap-2 py-2 text-2xl font-semibold text-gray-900 ">
            <TravelIcon className="text-xl" />
            Tour Itenary Setup {itenaries.length > 0 ? `(${itenaries.length})` : null}
          </p>

          <form name="add-itenary" className="mb-4 flex gap-4" onSubmit={itenary.handleSubmit(submitItenary)}>
            <div className="flex w-full gap-4 [&>*]:flex-1">
              <Input
                label="Date *"
                register={itenary.register("date", {
                  required: "Date is required",
                  min: { value: new Date().toISOString().split("T")[0], message: "Invalid date" },
                })}
                error={itenary.formState.errors["date"]}
                type="date"
              />

              <Select
                label="From *"
                options={locations.from}
                control={itenary.control}
                placeholder="Select from"
                name="from"
                register={itenary.register("from", { required: "From is required" })}
                error={itenary.formState.errors["from"]}
              />

              <Select
                label="To *"
                options={locations.to}
                control={itenary.control}
                placeholder="Select to"
                name="to"
                register={itenary.register("to", { required: "To is required" })}
                error={itenary.formState.errors["to"]}
              />
            </div>
            <Button className={twMerge("whitespace-nowrap py-[0.6875rem]", isValid ? "my-auto" : "mt-auto")}>
              Add Itenary <AddIcon className="ml-1 text-lg" />
            </Button>
          </form>

          <Table
            head={["Date", "From", "To", "Action"]}
            body={itenaries.map((value) => [
              value["date"],
              value["from"],
              value["to"],
              <button
                title="delete itenary"
                onClick={() => {
                  setItenaries((prev) => prev.filter((i) => i["id"] !== value["id"]));
                }}
                className="flex items-center justify-center rounded text-red-500/95 hover:scale-105 hover:text-red-600"
              >
                <DeleteIcon className="text-lg" />
              </button>,
            ])}
          />
        </div>
      )}
    </main>
  );
}

export function TravelIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m6.85 17.15l-3.2-1.75l1.05-1.05l2.5.35l3.9-3.9l-7.8-4.25l1.4-1.4l9.55 2.45l3.925-3.875Q18.6 3.3 19.238 3.3t1.062.425q.425.425.425 1.063T20.3 5.85l-3.9 3.9l2.45 9.55l-1.4 1.4l-4.25-7.8l-3.9 3.9l.35 2.5l-1.05 1.05l-1.75-3.2Z"
      ></path>
    </svg>
  );
}

export function PersonIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M10 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8zM4 8a6 6 0 1 1 12 0A6 6 0 0 1 4 8zm12.828-4.243a1 1 0 0 1 1.415 0a6 6 0 0 1 0 8.486a1 1 0 1 1-1.415-1.415a4 4 0 0 0 0-5.656a1 1 0 0 1 0-1.415zm.702 13a1 1 0 0 1 1.212-.727c1.328.332 2.169 1.18 2.652 2.148c.468.935.606 1.98.606 2.822a1 1 0 1 1-2 0c0-.657-.112-1.363-.394-1.928c-.267-.533-.677-.934-1.349-1.102a1 1 0 0 1-.727-1.212zM6.5 18C5.24 18 4 19.213 4 21a1 1 0 1 1-2 0c0-2.632 1.893-5 4.5-5h7c2.607 0 4.5 2.368 4.5 5a1 1 0 1 1-2 0c0-1.787-1.24-3-2.5-3h-7z"
      ></path>
    </svg>
  );
}

export function DeleteIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
      ></path>
    </svg>
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
