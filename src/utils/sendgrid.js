const express = require('express');
require('dotenv').config()

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = (to, from, subject, text, response) => {
  let result
  const msg = {
    to,
    from,
    subject,
    html: text
  }
  sgMail.send(msg, (err, info) => {
    const status = info ? info[0]['statusCode'] : null
    !err ? response.sendStatus(status) : response.sendStatus(400)

  })
}

module.exports = sendEmail
