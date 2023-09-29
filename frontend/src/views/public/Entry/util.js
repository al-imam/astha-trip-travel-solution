import axios from "axios";
import Swal from "sweetalert2";

export function getValue(anyThing) {
  if (
    typeof anyThing === "object" &&
    anyThing !== null &&
    !Array.isArray(anyThing) &&
    "value" in anyThing &&
    "label" in anyThing
  ) {
    return anyThing.value;
  }

  return anyThing;
}

export function flattenObject(obj) {
  const result = {};

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if ("value" in obj[key] && "label" in obj[key]) {
        result[key] = obj[key].value;
      } else if (Array.isArray(obj[key])) {
        result[key] = obj[key].map((item) => getValue(item));
      }
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

export function getNumberSelect(start, end) {
  const resultArray = [];

  for (let i = start; i <= end; i++) {
    resultArray.push({
      value: `${i}`,
      label: `${i}`,
    });
  }

  return resultArray;
}

export function fire(title = "Something Went Wrong!", icon = "warning", position = "center") {
  return Swal.fire({
    position,
    icon,
    title,
    showConfirmButton: false,
    timer: 1500,
    showClass: {
      backdrop: "backdrop-blur-[2px]",
    },
    customClass: {
      popup: "ring-1 ring-gray-200/50 shadow p-8 gap-4",
      icon: "m-0 mx-auto",
      title: "p-0",
    },
  });
}

export function goToTop(behavior = "instant") {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior });
  }
}

export function removeDuplicated(arrayOfObjects = [], filterBy) {
  return arrayOfObjects.reduce((acc, current) => {
    if (!acc.some((obj) => obj[filterBy] === current[filterBy])) acc.push(current);
    return acc;
  }, []);
}

export async function populate(id, cb = () => {}) {
  const serverRes = await axios.get(`/api/visa-form/get-by-passport/${encodeURIComponent(id)}`).catch(console.log);
  if (!serverRes) return null;
  cb(serverRes.data);
  return serverRes.data;
}

function capitalizeFirstLetter(inputString) {
  if (typeof inputString !== "string" || inputString.length === 0) {
    return inputString;
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
}

export function setValue(value, callback = () => {}, select = false) {
  if (!value) return;
  if (!select) return callback(value);
  if (Array.isArray(value)) return callback(value.map((value) => ({ value, label: value })));
  if (value instanceof Object && "value" in value && "label" in value) return callback(value);
  callback({ label: capitalizeFirstLetter(value), value });
}

export function getExactOption(optionArray = [], value) {
  return optionArray.find((_v) => compare(_v?.value, value));
}

export function compare(_1, _2) {
  return _1?.toString().toLowerCase() === _2?.toString().toLowerCase();
}

export function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
