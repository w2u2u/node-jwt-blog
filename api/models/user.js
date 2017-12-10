const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

// Here can't use arrow function !!!
UserSchema.pre('save', async function(next) {
  console.log(this.username)
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
  } catch (err) {
    next(err)
  }
})

UserSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('user', UserSchema)
