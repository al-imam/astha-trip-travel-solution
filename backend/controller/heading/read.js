const fs = require("fs");
const { join } = require("path");

const location = join(__dirname, "__store.txt");

async function read(req, res) {
  try {
    res.json({ text: fs.readFileSync(location, "utf-8") });
  } catch (error) {
    res.status(500).json({ message: "Error reading the file" });
  }
}

module.exports = read;
