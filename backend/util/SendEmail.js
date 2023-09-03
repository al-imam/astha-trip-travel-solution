const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function SendEmail({
  to,
  bcc,
  subject,
  text = "Something went wrong! Update Mail Application",
  html,
  attachments,
}) {
  try {
    const mailResponse = await transporter.sendMail({
      from: '"Astha Trip" <visa@asthatrip.com>',
      to,
      bcc,
      subject,
      text,
      html,
      attachments,
    });

    console.log(`Mail Send Id - ${mailResponse.messageId}`);

    return { send: mailResponse.messageId };
  } catch (error) {
    console.log("🚀 ~ SendEmail ~ error:", error);
    return { send: false, err: error, message: error.message };
  }
}

module.exports = SendEmail;
