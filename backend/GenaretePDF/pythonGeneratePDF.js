const path = require("path");
const axios = require("axios");
const fs = require("fs");
const { v4 } = require("uuid");

const baseURL = process.env.FLASK_BASE_URL ?? "http://127.0.0.1:8000";

function fix(str) {
  return `${str}`.trim().replace(/\s+/g, "-").toLowerCase();
}

async function generateVisaPDF(name, passport, purpose, country) {
  try {
    if (country.toLowerCase() === "vietnam") return null;

    const fileFullPath = path.join(
      __dirname,
      "generated-pdf",
      `${fix(name)}-${fix(passport)}-${v4()}-visa.pdf`
    );

    const { data: BufferPDF } = await axios.post(`${baseURL}/generate/visa/`, {
      name,
      passport: `${passport}`,
      purpose,
    });

    fs.writeFileSync(fileFullPath, BufferPDF);

    return fileFullPath;
  } catch (error) {
    return null;
  }
}

async function generateItenaryPDF({ guest, itenary: _i }) {
  try {
    const iternary = JSON.parse(_i);

    if (iternary.length < 0) return null;

    const fileFullPath = path.join(
      __dirname,
      "generated-pdf",
      `${fix(guest.name)}-${fix(guest.passport)}-${v4()}-itenary.pdf`
    );

    const { data: BufferPDF } = await axios.post(
      `${baseURL}/generate/itenary/`,
      {
        guest,
        itenary: iternary.map(({ to, from, date }) => ({ to, from, date })),
      }
    );

    fs.writeFileSync(fileFullPath, BufferPDF);

    return fileFullPath;
  } catch (error) {
    console.log(error, "iternary");
    return null;
  }
}

module.exports = { generateVisaPDF, generateItenaryPDF };
