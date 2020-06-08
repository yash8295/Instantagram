
require('dotenv').config()

const express = require('express'),
  app = express(),
  {
    env: { PORT, SESSION_SECRET_LETTER },
  } = process,
  favicon = require('serve-favicon'),
  { join } = require('path'),
  hbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  validator = require('express-validator'),
  session = require('client-sessions'),
  cookieParser = require('cookie-parser')

const { variables } = require('./config/Middlewares')
const AppRoutes = require('./routes/app-routes')

app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
  })
)
app.set('view engine', 'hbs')

app.use(favicon(join(__dirname, '/dist/images/favicon/favicon.png')))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(validator())
app.use(express.static(join(__dirname, '/dist')))
app.use(
  session({
    cookieName: 'session',
    secret: SESSION_SECRET_LETTER,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
)
app.use(cookieParser())

app.use(variables)

AppRoutes(app)

app.listen(PORT, () => console.log('App running..'))