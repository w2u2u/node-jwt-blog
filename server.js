const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Blog')
})

const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
