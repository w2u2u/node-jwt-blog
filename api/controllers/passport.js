const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const { JWT_SECRET } = require('../../config/index')
const User = require('../models/user')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      const user = await User.findById(payload.sub)
      if (!user) return done(null, false)
      done(null, user)
    }
  )
)

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username: username })
    if (!user) return done(null, false)

    const isMatch = await user.isValidPassword(password)
    if (!isMatch) return done(null, false)

    return done(null, user)
  })
)
