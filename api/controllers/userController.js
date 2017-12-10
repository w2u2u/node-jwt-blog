const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config/index')
const User = require('../models/user')

const signToken = user => {
  return JWT.sign(
    {
      iss: 'ApiAuth',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  )
}

exports.signin = (req, res) => {
  const token = signToken(req.user)
  res.json({ token: 'bearer ' + token })
}

exports.signup = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user) return res.status(403).json({ error: 'Username is already in use' })

  const newUser = new User({ username, password })
  await newUser.save()

  const token = signToken(newUser)
  res.status(200).json({ token: 'bearer ' + token })
}

exports.secret = (req, res) => {
  res.json({ message: 'You are authenticated' })
}
