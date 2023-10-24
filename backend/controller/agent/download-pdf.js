const LOI = require("../../model/LOI");
const PDF = require("../../GenaretePDF/pythonGeneratePDF");

async function downloadItenary(req, res, next) {
  try {
    const family = await LOI.find({ reference: req.params.reference });
    const guest = family.find((e) => e.id === req.params.id);

    PDF.getItenaryPDF({
      guests: family.map((g) => ({
        name: g.guest_name,
        passport: g.pasport_number,
      })),
      itenary: guest.itenary,
    });
  } catch (error) {
    next(error);
  }
}

async function downloadItenary(req, res, next) {
  try {
    const family = await LOI.find({ reference: req.params.reference });
    const guest = family.find((e) => e.id === req.params.id);

    PDF.getItenaryPDF({
      guests: family.map((g) => ({
        name: g.guest_name,
        passport: g.pasport_number,
      })),
      itenary: guest.itenary,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = downloadLoi;
