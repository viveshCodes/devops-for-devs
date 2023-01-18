const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/employee', (req, res) => {
  res.json([
    {
      "id":"1",
      "name":"Bruce Wayne"
    },
    {
      "id":"2",
      "name":"Joker"
    },
    {
      "id":"3",
      "name":"Selina Kyle"
    },
    {"id":"4",
     "name":"Bane"
    }
  ])
})

app.listen(5000, () => {
  console.log('listening for request on port 5000')
})