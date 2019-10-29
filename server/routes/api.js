// Requests will be directed here if the URI path begins with /api
const router = require('express').Router()

// Add to or edit the below to break up the app's API routes into separate files
// router.use('/SOMETHING', require('./SOMETHING'))

// If someone types a path that isn't available
router.use((req, res, next) => {
  const error = new Error('Path not found.')
  error.status = 404
  next(error)
})

module.exports = router
