const LOI = require("../../model/LOI");
const PDF = require("../../GenaretePDF/pythonGeneratePDF");
const SendEmail = require("../../util/SendEmail");
const Singapore_visa = require("../../model/Singapore");
const path = require("path");
const fs = require("fs");

async function SendMailWithAttachment(loiReqData, guests) {
  try {
    const visaFullPathPDF = await PDF.generateVisaPDF(
      loiReqData.guest_name,
      loiReqData.pasport_number,
      loiReqData.purpose,
      loiReqData.country
    );

    const itenaryFullPathPDF = await PDF.generateItenaryPDF({
      guests: guests.map((g) => ({
        name: g.guest_name,
        passport: g.pasport_number,
      })),
      itenary: loiReqData.iternary,
      name: loiReqData.guest_name,
      passport: loiReqData.pasport_number,
    });

    const fileList = [
      loiReqData.pasport_copy,
      loiReqData.visa_copy,
      loiReqData.hotel_copy,
      loiReqData.tiket_copy,
    ].filter(Boolean);

    const attachments = fileList.map((file) => ({
      filename: file,
      path: path.join(__dirname, "../../upload/loireqfile", file),
    }));

    if (visaFullPathPDF) {
      attachments.push({
        filename: `${loiReqData.guest_name}-letter.pdf`,
        path: visaFullPathPDF,
      });
    }

    if (itenaryFullPathPDF) {
      attachments.push({
        filename: `${loiReqData.guest_name}-itenary.pdf`,
        path: itenaryFullPathPDF,
      });
    }

    if (attachments.some((a) => !fs.existsSync(a.path))) {
      throw new Error("Some attachments file not exist");
    }

    const mails = [];

    if (loiReqData.agent) {
      const agent = JSON.parse(loiReqData.agent);
      mails.push(agent.username);
    }

    // TODO: add task massager here for set email tasks assigns.
    /* 
     [] add a task queue system plane for radis bullQ.
     [] assign email task to the queue pipe for send email.
    */

    const mailRes = await SendEmail({
      to: ["i3371595@gmail.com", "nahidhasan141400@gmail.com"],
      bcc: mails,
      subject: `${loiReqData.pasport_number}-${loiReqData.guest_name}`,
      attachments,
      html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
    });

    if (!mailRes.send) {
      throw new Error({
        message: mailRes.message,
        instanceof: "loi-approve",
      });
    }

    await LOI.update({
      set: { status: "approved" },
      where: { id: loiReqData.id },
    });

    if (loiReqData.visa_application != 0) {
      if (loiReqData.country === "Singapore")
        await Singapore_visa.update({
          set: { status: "approved" },
          where: {
            id: loiReqData.visa_application,
          },
        });
    }

    return false;
  } catch (error) {
    return error;
  }
}

async function approveLoiRequest(req, res, next) {
  try {
    const [dbRes] = await LOI.findAll();
    const [guest] = dbRes.filter((e) => e.id === req.body.id);
    const allGuest = dbRes.filter((e) => e.reference === guest.reference);

    const sendRes = allGuest.map((loi) => {
      return SendMailWithAttachment(loi, allGuest);
    });

    const datas = await Promise.all(sendRes);
    const result = datas.filter((e) => e);

    if (result.length > 0) {
      return res.status(416).json({
        message: "Some data not approved please check mail",
        instanceof: "loi-approve",
      });
    }

    global.io.emit("getNewLOI");
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("🚀 ~ approved ~ error:", error);
    next(error);
  }
}

module.exports = approveLoiRequest;
