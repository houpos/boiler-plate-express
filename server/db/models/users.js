const Sequelize = require('sequelize');
const db = require('../index')
const crypto = require('crypto')
const _ = require('lodash')

const User = db.define('users', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

// instance methods
User.prototype.correctPassword = function(candidatePassword) {
  console.log('candidate password', candidatePassword);
  console.log('password', this.password);
  console.log('salt', this.salt);
    console.log(
      'outputted password',
      User.encryptPassword(candidatePassword, this.salt)
    );

  return (
    User.encryptPassword(candidatePassword, this.salt) === this.password
  );
};

User.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function () {
  // this should generate our random salt
    const salt = crypto.randomBytes(16);
    return salt.toString('base64')
};

User.encryptPassword = function (plainText, salt) {
  // accepts a plain text password and a salt, and returns its hash
    // console.error('encryptpassword', plainText);
    // console.error('encryptpassword', salt);

  const hash = crypto.createHash('sha1')
  hash.update(plainText)
  hash.update(salt)
  return hash.digest('hex');
};

function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
        console.log('user password', user.password);

  }
}

module.exports = User
