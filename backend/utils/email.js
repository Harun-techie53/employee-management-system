const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //Create email options
  const mailOptions = {
    from: "Test Admin<testadmin@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail has been sent");
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = sendEmail;
