module.exports = app => {
  const passport = require('passport')
  const user = require('../controllers/userController')

  app
    .route('/login')
    .post(passport.authenticate('local', { session: false }), user.signin)

  app.route('/register').post(user.signup)

  app
    .route('/secret')
    .get(passport.authenticate('jwt', { session: false }), user.secret)
}
