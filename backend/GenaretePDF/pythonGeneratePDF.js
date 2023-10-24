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
    function createFolderIfNotExists(folderPath) {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    }
    createFolderIfNotExists(path.join(__dirname, "generated-pdf"));

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
    console.log(
      "🚀 ~ file: pythonGeneratePDF.js:32 ~ generateVisaPDF ~ error:",
      error
    );
    return null;
  }
}

// async function generateItenaryPDF({ guests, itenary: _i }) {
//   try {
//     function createFolderIfNotExists(folderPath) {
//       if (!fs.existsSync(folderPath)) {
//         fs.mkdirSync(folderPath);
//       }
//     }
//     createFolderIfNotExists(path.join(__dirname, "generated-pdf"));
//     const iternary = JSON.parse(_i);

//     if (iternary.length < 0) return null;

//     const fileFullPath = path.join(
//       __dirname,
//       "generated-pdf",
//       `${v4()}-itenary.pdf`
//     );

//     const { data: BufferPDF } = await axios.post(
//       `${baseURL}/generate/itenary/`,
//       {
//         guests,
//         itenary: iternary.map(({ to, from, date }) => ({ to, from, date })),
//       }
//     );

//     fs.writeFileSync(fileFullPath, BufferPDF);

//     return fileFullPath;
//   } catch (error) {
//     return null;
//   }
// }

async function generateItenaryPDF({ guests, itenary: _i, name, passport }) {
  try {
    function createFolderIfNotExists(folderPath) {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    }
    createFolderIfNotExists(path.join(__dirname, "generated-pdf"));
    const iternary = JSON.parse(_i);

    if (iternary.length < 0) return null;

    const fileFullPath = path.join(
      __dirname,
      "generated-pdf",
      `${fix(name)}-${fix(passport)}-${v4()}-itenary.pdf`
    );

    const { data: BufferPDF } = await axios.post(
      `${baseURL}/generate/itenary/`,
      {
        guests,
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

async function getItenaryPDF({ guests, itenary: _i }) {
  try {
    const iternary = JSON.parse(_i);

    const { data: BufferPDF } = await axios.post(
      `${baseURL}/generate/itenary/`,
      {
        guests,
        itenary: iternary.map(({ to, from, date }) => ({ to, from, date })),
      }
    );

    return BufferPDF;
  } catch (error) {
    console.log(
      "🚀 ~ file: pythonGeneratePDF.js:95 ~ getItenaryPDF ~ error:",
      error
    );
    return null;
  }
}

async function getVisaPDF(name, passport, purpose) {
  try {
    const { data: BufferPDF } = await axios.post(`${baseURL}/generate/visa/`, {
      name,
      passport: `${passport}`,
      purpose,
    });

    return BufferPDF;
  } catch (error) {
    console.log(
      "🚀 ~ file: pythonGeneratePDF.js:111 ~ getVisaPDF ~ error:",
      error
    );
    return null;
  }
}

module.exports = {
  generateVisaPDF,
  generateItenaryPDF,
  getVisaPDF,
  getItenaryPDF,
};
