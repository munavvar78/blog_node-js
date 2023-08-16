const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3f59fed29e8e98",
      pass: "578afc4e4044d5"
    }
  });
module.exports = {transporter};
