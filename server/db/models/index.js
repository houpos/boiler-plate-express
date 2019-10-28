// Import models here
const { Model1 } = require('./model1')
const { db } = require('../index')

// Define associations below
console.log('DATABASE', db)
module.exports = {
  Model1,
  db
}
