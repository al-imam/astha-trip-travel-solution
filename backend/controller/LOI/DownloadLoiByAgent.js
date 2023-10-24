const LOI_Data = require("../../model/LOI");
const fs = require("fs");
const pythonGeneratePDF = require("../../GenaretePDF/pythonGeneratePDF");
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
  };
};

module.exports = DownloadByAgent;
