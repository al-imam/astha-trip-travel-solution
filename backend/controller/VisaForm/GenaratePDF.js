const Generate_schengen = require("../../util/Form/Genarate_schengen");
const Generate_singapore = require("../../util/Form/Genarate_Sngapore");
const Generate_thailand = require("../../util/Form/Genarate_thailand");
const GeneratePDF = () => {
  return {
    schengen: async (req, res, next) => {
      let pass = false;
      if (req.User.Admin) {
        pass = true;
      }
      try {
        const { id } = req.params;
        const { file, name } = await Generate_schengen(id, pass);

        res.set({
          "Content-Disposition": `attachment; filename=${name}-visa-form.pdf`,
          "Content-Type": "application/pdf",
        });
        res.end(file);
      } catch (error) {
        next(error);
      }
    },
    singapore: async (req, res, next) => {
      let pass = false;
      if (req.User.Admin) {
        pass = true;
      }
      try {
        const { id } = req.params;
        const { file, name } = await Generate_singapore(id, pass);
        if (!file) {
          throw "the pdf is not generated";
        }
        res.set({
          "Content-Disposition": `attachment; filename=${name}-visa-form.pdf`,
          "Content-Type": "application/pdf",
        });
        res.end(file);
      } catch (error) {
        next(error);
      }
    },
    thailand: async (req, res, next) => {
      let pass = false;
      if (req.User.Admin) {
        pass = true;
      }
      try {
        const { file, name } = await Generate_thailand(req.params.id, pass);

        res.set({
          "Content-Disposition": `attachment; filename=${name}-visa-form.pdf`,
          "Content-Type": "application/pdf",
        });

        res.end(file);
      } catch (error) {
        next(error);
      }
    },
  };
};

module.exports = GeneratePDF;
