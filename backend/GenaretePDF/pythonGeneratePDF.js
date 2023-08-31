const path = require("path");
const axios = require("axios");
const fs = require("fs");
const { v4 } = require("uuid");

const baseURL = process.env.FAST_API_BASE_URL ?? "http://127.0.0.1:8000";

async function generateVisaPDF(name, passport) {
  try {
    const fileFullPath = path.join(
      __dirname,
      "generated-pdf",
      `${name}-${passport}-${v4()}.pdf`
    );

    const { data: BufferPDF } = await axios.post(
      `${baseURL}/generate/visa/`,
      { name, passport },
      { responseType: "arraybuffer" }
    );

    fs.writeFileSync(fileFullPath, BufferPDF);

    return fileFullPath;
  } catch (error) {
    return null;
  }
}

module.exports = { generateVisaPDF };
