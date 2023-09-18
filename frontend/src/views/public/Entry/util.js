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
