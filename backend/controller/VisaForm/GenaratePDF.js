const Generate_schengen = require("../../util/Form/Genarate_schengen");
const Generate_singapore = require("../../util/Form/Genarate_Sngapore");
const GeneratePDF = () => {
  return {
    schengen: async (req, res, next) => {
      try {
        const { id } = req.params;
        const { file, name } = await Generate_schengen(id);

        res.set({
          "Content-Disposition": `attachment; filename=${name}-visa-form.pdf`,
          "Content-Type": "application/pdf",
        });
        res.end(file);

        // res.send(name);
      } catch (error) {
        // res.status(500).send(error);
        next(error);
      }
    },
    singapore: async (req, res, next) => {
      try {
        const { id } = req.params;
        const { file, name } = await Generate_singapore(id);

        res.set({
          "Content-Disposition": `attachment; filename=${name}-visa-form.pdf`,
          "Content-Type": "application/pdf",
        });
        res.end(file);

        // res.send(name);
      } catch (error) {
        // res.status(500).send(error);
        next(error);
      }
    },
  };
};

module.exports = GeneratePDF;
