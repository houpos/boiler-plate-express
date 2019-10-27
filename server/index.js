const express = require('express') //https://www.npmjs.com/package/express
const app = express()
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

// logging middleware https://www.npmjs.com/package/morgan
app.use(morgan('dev'))

// static middleware https://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, './public')))

// parsing middleware https://www.npmjs.com/package/body-parser

// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.json())
// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.urlencoded({ extended: true }))

// Separating out our API routes
app.use('/api', require('./routes/index'))

// NEEDS TO BE LAST ROUTE. Catch any paths that don't match above and send back homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
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
  console.log('Knock, knock')
  console.log("Who's there?")
  console.log(`Your server, listening on port ${port}`)
})
