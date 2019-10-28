// Create a new file for each model
const Sequelize = require('sequelize')
const db = require('../index')

const Model1 = db.define('model1', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Model1
