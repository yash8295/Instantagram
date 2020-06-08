const app = require('express').Router()

app.post('/check-is-admin', async (req, res) => {
  let { password } = req.body,
    { ADMIN_PASSWORD } = process.env

  if (password != ADMIN_PASSWORD) {
    res.json({ mssg: 'Wrong password!!' })
  } else {
    req.session.isadmin = true
    res.json({
      mssg: 'Hello admin!!',
      success: true,
    })
  }
})

app.post('/admin-logout', async (req, res) => {
  req.session.isadmin = false
  res.json('Hello, World!!')
})

module.exports = app
