const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "24bc45eb848849",
    pass: "8d90923d6cfe30"
  }
});

  