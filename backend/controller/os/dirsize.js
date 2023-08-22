const { statSync, readdirSync } = require("fs");
const { readdir } = require("fs/promises");
const { join } = require("path");

const dirSize = async (dir) => {
  const files = readdirSync(dir, { withFileTypes: true });

  const paths = files.map(async (file) => {
    const path = join(dir, file.name);
    if (file.isDirectory()) return await dirSize(path);
    if (file.isFile()) return statSync(path).size;
    return 0;
  });

  console.log(paths);

  return (await Promise.all(paths))
    .flat(Infinity)
    .reduce((i, size) => i + size, 0);
};

module.exports = dirSize;
