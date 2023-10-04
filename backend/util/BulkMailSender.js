const nodemailer = require("nodemailer");

const MAIL_HOST = "mail.asthatrip.com";
const MAIL_PORT = 465;
const MAIL_USER = "visa@asthatrip.com";
const MAIL_PASS = "visa@2023";

const transporter = nodemailer.createTransport({
  // pool: true,
  host: MAIL_HOST,
  port: MAIL_PORT,
  // maxConnections: 9,
  // maxMessages: 10,
  // rateDelta: 2000,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const path = require("path");
const attachments = [
  {
    filename: "helo nahid.jpg",
    path: path.join(__dirname, "./demo.jpg"),
  },
  {
    filename: "helo nahid 2.jpg",
    path: path.join(__dirname, "./demo.jpg"),
  },
  {
    filename: "helo nahid 3.jpg",
    path: path.join(__dirname, "./demo.jpg"),
  },
];

let massage = [
  {
    from: '"Pool connection" <visa@asthatrip.com>',
    to: ["nahidhasan141400@gmail.com"],
    // bcc: mails,
    subject: `helo 1`,
    attachments: attachments,
    html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
  },
  {
    from: '"Pool connection" <visa@asthatrip.com>',
    to: ["nahidhasan141400@gmail.com"],
    // bcc: mails,
    subject: `helo 2`,
    attachments: attachments,
    html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
  },
  {
    from: '"Pool connection" <visa@asthatrip.com>',
    to: ["nahidhasan141400@gmail.com"],
    // bcc: mails,
    subject: `helo 3`,
    attachments: attachments,
    html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
  },
  {
    from: '"Pool connection" <visa@asthatrip.com>',
    to: ["nahidhasan141400@gmail.com"],
    // bcc: mails,
    subject: `helo 4`,
    attachments: attachments,
    html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
  },
  {
    from: '"Pool connection" <visa@asthatrip.com>',
    to: ["nahidhasan141400@gmail.com"],
    // bcc: mails,
    subject: `helo 5`,
    attachments: attachments,
    html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
  },
  {
    from: '"Pool connection" <visa@asthatrip.com>',
    to: ["nahidhasan141400@gmail.com"],
    // bcc: mails,
    subject: `helo 6`,
    attachments: attachments,
    html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
  },
  {
    from: '"Pool connection" <visa@asthatrip.com>',
    to: ["nahidhasan141400@gmail.com"],
    // bcc: mails,
    subject: `helo 7`,
    attachments: attachments,
    html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
  },
  {
    from: '"Pool connection" <visa@asthatrip.com>',
    to: ["nahidhasan141400@gmail.com"],
    // bcc: mails,
    subject: `helo 8`,
    attachments: attachments,
    html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
  },
  {
    from: '"Pool connection" <visa@asthatrip.com>',
    to: ["nahidhasan141400@gmail.com"],
    // bcc: mails,
    subject: `helo 9`,
    attachments: attachments,
    html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
  },
  {
    from: '"Pool connection" <visa@asthatrip.com>',
    to: ["nahidhasan141400@gmail.com"],
    // bcc: mails,
    subject: `helo 10`,
    attachments: attachments,
    html: " <p style='font-size:20px'>Dear Sir,</p></br> <p>Greetings from Astha trip.</p></br><p>Please Find The Attached File. If you have any query please do not hesitate to contact with me</p></br> ",
  },
];

const send = async (msg) => {
  try {
    return await transporter.sendMail(msg);
  } catch (error) {
    console.log("🚀 ~ file: BulkMailSender.js:115 ~ send ~ error:", error);
  }
};

let resArr = [];
massage.forEach((ms) => {
  const res = send(ms);
  res
    .then((re) => {
      resArr.push(re.messageId);
      check(resArr);
    })
    .catch((e) => console.log("error=> ", e));
});

const check = (arr) => {
  console.log("send: ", arr.length);
  if (arr.length === massage.length) {
    transporter.close();
    console.log(arr);
  }
};
