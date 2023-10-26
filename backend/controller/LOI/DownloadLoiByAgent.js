const LOI_Data = require("../../model/LOI");
const axios = require("axios");
const pythonGeneratePDF = require("../../GenaretePDF/pythonGeneratePDF");
const fs = require("fs");
const baseURL = process.env.FLASK_BASE_URL ?? "http://127.0.0.1:8000";
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
const path = require("path");
var zip = require("express-zip");
const { readFile, writeFile } = require("fs/promises");
const pdfPath = path.join(__dirname, "/temp-file");
const DownloadByAgent = function () {
  return {
    loi: async (req, res, next) => {
      try {
        const { id } = req.params;
        const { AGENT } = req;
        const [LOI_data] = await LOI_Data.findById(id);

        if (!LOI_data) {
          return next(
            new Error({
              type: "not valid id provided",
            })
          );
        }

        const agent_onLoi = JSON.parse(LOI_data.agent);

        if (agent_onLoi.username !== AGENT.email) {
          return next(
            new Error({
              type: "not valid id provided for download",
            })
          );
        }
        // return res.send(LOI_data.pasport_number);
        // generate the loi pdf file

        const BlobFile = await pythonGeneratePDF.getVisaPDF(
          LOI_data.guest_name,
          LOI_data.pasport_number,
          LOI_data.purpose
        );
        // console.log(BlobFile);
        // fs.writeFileSync("./nahid.pdf", BlobFile);
        res.set({
          "Content-Disposition": `attachment; filename=${LOI_data.guest_name}-${LOI_data.pasport_number}-Loi.pdf`,
          "Content-Type": "application/pdf",
        });
        res.end(BlobFile);
        // res.send("save");
      } catch (error) {
        console.log(
          "🚀 ~ file: DownloadLoiByAgent.js:7 ~ loi: ~ error:",
          error
        );
        next(error);
      }
    },
    itinerary: async (req, res, next) => {
      try {
        const { ref } = req.params;

        const { AGENT } = req;
        const agentref = `{"type":"agent","username":"${AGENT.email}"}`;
        const LOI_data = await LOI_Data.find({
          reference: ref,
          agent: agentref,
        });

        const BlobFile = await pythonGeneratePDF.getItenaryPDF({
          guests: LOI_data.map((g) => ({
            name: g.guest_name,
            passport: g.pasport_number,
          })),
          itenary: LOI_data[0].iternary,
          name: LOI_data[0].guest_name,
          passport: LOI_data[0].pasport_number,
        });
        res.set({
          "Content-Disposition": `attachment; filename=${LOI_data[0].guest_name}-${LOI_data[0].pasport_number}-Loi.pdf`,
          "Content-Type": "application/pdf",
        });
        res.end(BlobFile);
      } catch (error) {
        console.log(
          "🚀 ~ file: DownloadLoiByAgent.js:57 ~ itinerary: ~ error:",
          error
        );
        next(error);
      }
    },

    // admin download all file related to loi
    adminLoiFile: async (req, res, next) => {
      try {
        const { id } = req.params;

        const LOI_data = await LOI_Data.findById(id);
        const LOI_dataWithRef = await LOI_Data.find({
          reference: LOI_data[0].reference,
        });
        // generated loi blob |
        const loiBlob = await pythonGeneratePDF.getVisaPDF(
          LOI_data[0].guest_name,
          LOI_data[0].pasport_number,
          LOI_data[0].purpose
        );
        //generated itinerary
        const itineraryBlob = await pythonGeneratePDF.getItenaryPDF({
          guests: LOI_dataWithRef.map((g) => ({
            name: g.guest_name,
            passport: g.pasport_number,
          })),
          itenary: LOI_data[0].iternary,
          name: LOI_data[0].guest_name,
          passport: LOI_data[0].pasport_number,
        });
        // make zip

        const loipath = `${pdfPath}/${LOI_data[0].guest_name}-${id}loi.pdf`;
        await writeFile(loipath, loiBlob);

        const itineraryPath = `${pdfPath}/${LOI_data[0].guest_name}-${id}itinerary.pdf`;
        await writeFile(itineraryPath, itineraryBlob);

        res.zip([
          { path: loipath, name: `${LOI_data[0].guest_name}-${id}-loi.pdf` },
          {
            path: itineraryPath,
            name: `${LOI_data[0].guest_name}-${id}-itinerary.pdf`,
          },
        ]);
        // setTimeout(() => {
        //   deleteFile(loipath);
        //   deleteFile(itineraryPath);
        // }, 1000);
      } catch (error) {
        console.log(
          "🚀 ~ file: DownloadLoiByAgent.js:92 ~ adminLoiFile: ~ error:",
          error
        );
        next(error);
      }
    },
    familyUndertaking: async (req, res, next) => {
      try {
        const { User } = req;
        console.log(
          "🚀 ~ file: DownloadLoiByAgent.js:158 ~ familyUndertaking: ~ User:",
          User
        );
        const { id } = req.params;

        const LOI_data = await LOI_Data.findById(id);

        if (User.Agent) {
          const agentref = `{"type":"agent","username":"${User.Agent.email}"}`;

          if (LOI_data[0].agent !== agentref) {
            throw new Error("not valid request");
          }
        }
        const LOI_dataWithRef = await LOI_Data.find({
          reference: LOI_data[0].reference,
        });

        const blob = await axios.post(
          `${baseURL}/generate/undertaking/family/`,
          {
            name: LOI_data[0].guest_name,
            array: LOI_dataWithRef.map((e, i) => {
              return {
                sl: `${i}`,
                name: e.guest_name,
                number: e.pasport_number,
                remarks: e.relationship,
              };
            }),
          }
        );
        res.set({
          "Content-Disposition": `attachment; filename=${LOI_data[0].guest_name}-undertaking.pdf`,
          "Content-Type": "application/pdf",
        });

        res.end(blob.data);
      } catch (error) {
        console.log(
          "🚀 ~ file: DownloadLoiByAgent.js:160 ~ familyUndertaking: ~ error:",
          error
        );
        next(error);
      }
    },
  };
};

module.exports = DownloadByAgent;
