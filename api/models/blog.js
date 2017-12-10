const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: [
      {
        type: String,
        enum: ['public', 'private']
      }
    ],
    default: 'public'
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('blog', BlogSchema)
