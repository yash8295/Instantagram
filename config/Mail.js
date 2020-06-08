const nodemailer = require('nodemailer')
const { MAIL, MAIL_PASSWORD } = process.env

let transporter = nodemailer.createTransport({
  service: 'Yandex',
  auth: {
    user: MAIL,
    pass: MAIL_PASSWORD,
  },
})

let mail = options =>
  new Promise((resolve, reject) => {
    let o = {
      from: `Instagram <${MAIL}>`,
      ...options,
    }

    transporter.sendMail(o, err => {
      if(err)
      {
          console.log(err);
          reject(err) 
      }
      else
          resolve('Mail Sent!!')
    })
  })

module.exports = mail