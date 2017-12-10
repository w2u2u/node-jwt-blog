const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 5555

mongoose.Promise = global.Promise
mongoose
  .connect('mongodb://localhost/BlogDB', { useMongoClient: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})

require('./api/routes/blogRoute')(app)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
