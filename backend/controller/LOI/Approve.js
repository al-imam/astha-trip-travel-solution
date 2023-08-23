const LOI = require("../../model/LOI");
const PdfGenaret = require("../../GenaretePDF/GenaratePDF");
const SendMail = require("../../util/SendMail");
const path = require("path");

const prosses = async (req, res, element) => {
  console.log("start");
  var hostname = req.headers.host;
  var proto = req.protocol;
  const url = `${proto}://${hostname}/pdfgen/${element.id}`;
  const urlit = `${proto}://${hostname}/pdfgenitenary/${element.id}`;

  try {
    const letter = await PdfGenaret(
      url,
      element.id,
      element.guest_name,
      "letter"
    );
    const itenary = await PdfGenaret(
      urlit,
      element.id,
      element.guest_name,
      "itenary"
    );

    const filelist = [];
    if (element.pasport_copy && element.pasport_copy !== "") {
      filelist.push(element.pasport_copy);
    }
    if (element.visa_copy && element.visa_copy !== "") {
      filelist.push(element.visa_copy);
    }
    if (element.hotel_copy && element.hotel_copy !== "") {
      filelist.push(element.hotel_copy);
    }
    if (element.tiket_copy && element.tiket_copy !== "") {
      filelist.push(element.tiket_copy);
    }

    const fileAtachment = filelist.map((e) => {
      return {
        path: path.join(__dirname, "../../upload/loireqfile", e),
      };
    });

    const agentmail = [];
    if (element.agent) {
      agentmail.push(JSON.parse(element.agent).username);
    }

    const SendMailres = await SendMail(
      ["nahidhasan141400@gmail.com"],
      ["nahidhasan.opt@gmail.com", ...agentmail],
      `${element.pasport_number}-${element.guest_name}`,
      "",
      `
        <p styel="font-size:20px">Dear Sir,</p></br>
        <p>Greetings from Astha trip.</p></br>
        <p>Please Find The Attached File.
        If you have any query please do not hesitate to contact with me</p></br>

      `,
      [
        ...fileAtachment,
        {
          filename: `${element.guest_name}-letter.pdf`,
          path: path.join(__dirname, "../../GenaretePDF/pdf", letter),
        },
        {
          filename: `${element.guest_name}- iternary.pdf`,
          path: path.join(__dirname, "../../GenaretePDF/pdf", itenary),
        },
      ]
    );
    if (!SendMailres?.send) {
      console.log("error nahid");
      throw {
        mesage: SendMail.message,
        instanceof: "loiapprove",
      };
    }

    const updaet = await LOI.RayQuery(
      `UPDATE loi_data SET status = 'approved' WHERE loi_data.id = ${element.id};`
    );

    return false;
  } catch (error) {
    return error;
  }
};

const approved = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw {
        mesage: "id is required",
        instanceof: "loiapp",
      };
    }

    const [resdb] = await LOI.findAll();
    const [Guest] = resdb.filter((e) => e.id === id);
    const AllGuest = resdb.filter((e) => e.reference === Guest.reference);

    let dataresponse = await AllGuest.map(async (element) => {
      const opration = await prosses(req, res, element);
      return opration;
    });
    const datas = await Promise.all(dataresponse);

    const result = datas.filter((e) => e);
    if (result.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "approved",
      });
    } else {
      throw {
        message: "some data not approved please chack email",
        instanceof: "loiapprove",
      };
    }
  } catch (error) {
    console.log("🚀 ~ file: Approve.js:60 ~ approved ~ error:", error);
    next(error);
  }
};
module.exports = approved;
