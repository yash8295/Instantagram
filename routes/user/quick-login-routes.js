const app = require('express').Router()

app.post('/remove-quick-login', (req, res) => {
  let users = JSON.parse(req.cookies.users),
    filtered = users.filter(u => u.id != req.body.id)

  res.cookie('users', `${JSON.stringify(filtered)}`)
  res.json('Hello, World!!')
})

app.post('/clear-all-quick-logins', (req, res) => {
  res.clearCookie('users')
  res.json('Hello, World!!')
})

module.exports = app
