const fs = require("fs");
const { join } = require("path");

const location = join(__dirname, "__store.txt");

async function write(req, res) {
  try {
    fs.writeFileSync(location, req.body.text.trim(), "utf-8");
    res.json({ success: true, text: req.body.text.trim() });
  } catch (error) {
    res.status(500).json({ message: "Error updating the file" });
  }
}

module.exports = write;
