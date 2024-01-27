const nodemailer = require('nodemailer');

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
      user: 'maida.ratke81@ethereal.email',
      pass: 'xFGj7ANjUtgXv14BpB'
  }
})

const mailer = message => { 
  transporter.sendMail( message, (error, info)=> {
    if(error) return console.log (error)
    console.log ('Email sent: ', info)
  }) 
}

module.exports = mailer;