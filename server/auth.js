const router = require('express').Router();
const passport = require('passport')
const User = require('./db/models/users');
module.exports = router;

router.get('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      let noUserError = new Error('No User Found')
      noUserError.status = 401
      throw noUserError
    } else if (!user.correctPassword(req.body.password)) {
      let badPWDError = new Error('Incorrect Password')
      badPWDError.status = 401
      throw badPWDError
    } else if (user.correctPassword(req.body.password)) {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (error) {
    next(error)
  }
})

passport.serializeUser((user, done) => {
  try {
    console.log('in serializeuser', user.id);
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});
