const dirSize = require("./dirsize");
const { normalize } = require("path");

const dir = normalize(process.env.CONTAINING_FOLDER_PATH);

function round(num) {
  const strNum = num.toString();
  const int = parseInt(num);

  if (isNaN(int)) return 0;

  if (strNum.includes(".")) {
    const dsc = parseFloat("." + strNum.split(".")[1]);
    return dsc > 0.5 ? int + 1 : int;
  }

  return int;
}

async function storage(req, res, next) {
  try {
    const usedStorage = await dirSize(dir);

    const totalStorage = 50 * 1024 ** 3;
    const freeStorage = totalStorage - usedStorage;

    const totalStorageGB = round(totalStorage / 1024 ** 3);
    const freeStorageGB = round(freeStorage / 1024 ** 3);
    const usedStorageGB = round(usedStorage / 1024 ** 3);

    const freeStoragePercentage = round((freeStorage / totalStorage) * 100);
    const usedStoragePercentage = round((usedStorage / totalStorage) * 100);

    res.json({
      freeStoragePercentage,
      usedStoragePercentage,
      totalStorageGB,
      freeStorageGB,
      usedStorageGB,
      scale: "Gigabyte",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = storage;
