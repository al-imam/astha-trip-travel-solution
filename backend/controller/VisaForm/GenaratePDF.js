const Generate_schengen = require("../../util/Form/Genarate_schengen");
const Generate_singapore = require("../../util/Form/Genarate_Sngapore");
const Generate_thailand = require("../../util/Form/Genarate_thailand");
const path = require("path");
var zip = require("express-zip");
const { readFile, writeFile } = require("fs/promises");
const fs = require("fs");

function deleteFile(filePath) {
  // Use fs.unlink to delete the file
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    } else {
      return true;
    }
  });
}
const pdfPath = path.join(__dirname, "/pdf");

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

        const { file, name, undertaking } = await Generate_singapore(id, pass);

        const path_undertaking = `${pdfPath}/${name}-${id}_undertaking.pdf`;
        await writeFile(path_undertaking, undertaking);
        const path_visa_form = `${pdfPath}/${name}-${id}_visa-form.pdf`;
        await writeFile(path_visa_form, undertaking);

        if (!file) {
          throw "the pdf is not generated";
        }
        // npm install archiver ** <- zip alternative ** \\
        res.zip([
          { path: path_undertaking, name: `${name}-${id}-undertaking.pdf` },
          {
            path: path_visa_form,
            name: `${name}-${id}-visa_application_form.pdf`,
          },
        ]);
        setTimeout(() => {
          deleteFile(path_undertaking);
          deleteFile(path_visa_form);
        }, 5000);
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
