const fs = require("fs");
const { join } = require("path");

const location = join(__dirname, "__store.txt");

function readFileSilent(p) {
  try {
    return fs.readFileSync(p, "utf8").trim();
  } catch (error) {
    return "";
  }
}

async function read(_, res) {
  try {
    res.json({ text: readFileSilent(location) });
  } catch (error) {
    res.status(500).json({ message: "Error reading the file" });
  }
}

module.exports = read;
