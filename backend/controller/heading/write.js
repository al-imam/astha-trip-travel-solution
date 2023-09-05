const fs = require("fs");
const { join } = require("path");

const location = join(__dirname, "store.txt");

async function write(req, res) {
  try {
    fs.writeFileSync(location, req.body.text, "utf-8");
    res.json({ success: true, text: req.body.text });
  } catch (error) {
    res.status(500).json({ message: "Error updating the file" });
  }
}

module.exports = write;
