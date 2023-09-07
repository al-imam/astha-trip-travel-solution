const path = require("path");
const axios = require("axios");
const fs = require("fs");
const { v4 } = require("uuid");

const baseURL = process.env.FLASK_BASE_URL ?? "http://127.0.0.1:8000";

function fix(str) {
  return `${str}`.trim().replace(/\s+/g, "-").toLowerCase();
}

async function generateVisaPDF(name, passport) {
  try {
    const fileFullPath = path.join(
      __dirname,
      "generated-pdf",
      `${fix(name)}-${fix(passport)}-${v4()}-visa.pdf`
    );

    const { data: BufferPDF } = await axios.post(`${baseURL}/generate/visa/`, {
      name,
      passport: `${passport}`,
    });

    fs.writeFileSync(fileFullPath, BufferPDF);

    return fileFullPath;
  } catch (error) {
    return null;
  }
}

async function generateItenaryPDF({ guest, itenary }) {
  try {
    const fileFullPath = path.join(
      __dirname,
      "generated-pdf",
      `${fix(guest.name)}-${fix(guest.passport)}-${v4()}-itenary.pdf`
    );

    const { data: BufferPDF } = await axios.post(
      `${baseURL}/generate/itenary/`,
      { guest, itenary: JSON.parse(itenary) }
    );

    fs.writeFileSync(fileFullPath, BufferPDF);

    return fileFullPath;
  } catch (error) {
    return null;
  }
}

module.exports = { generateVisaPDF, generateItenaryPDF };
