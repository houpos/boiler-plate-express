const express = require('express') //https://www.npmjs.com/package/express
const app = express()
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const env = require('../secrets')
const passport = require('passport');

// logging middleware https://www.npmjs.com/package/morgan
app.use(morgan('dev'))

// parsing middleware https://www.npmjs.com/package/body-parser

// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.json())
// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.urlencoded({ extended: true }))

/***************************************/
/* Create persistent session storage */

// we will need our sequelize instance from somewhere
const db = require('./db/index');
// we should do this in the same place we've set up express-session
const session = require('express-session');

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();
/**************************************/

// Session middleware
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// static middleware https://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, '..', 'public')))

// OAuth Passport Middleware HERE!! Must come after session middleware
// This middleware will consume our req.session object, and attach the user to the request object.
app.use(passport.initialize())
app.use(passport.session())

// authentication router
app.use('/auth', require('./auth'))

// Separating out our API routes
app.use('/api', require('./routes/index'))

// NEEDS TO BE LAST ROUTE. Catch any paths that don't match above and send back homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

// Server issues. MUST BE LAST
app.use((error, req, res, next) => {
  console.error(error)
  console.error(error.stack)
  res.status(error.status  || 500).send(error.message || 'Internal server error.')
})

module.exports = app

const port = process.env.PORT || 3333
app.listen(port, function() {
  console.log(`Your server, listening on port ${port}`)
  console.log(`http://localhost:${port}`);
})
