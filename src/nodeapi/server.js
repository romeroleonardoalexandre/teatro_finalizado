const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const db = require('./app/db.js')

const app = express()

const port = 8087

app.use(bodyParser.json());
app.use(cors())
db.connect('mongodb://localhost:27017/teatro', db => {
  require('./app/routes')(app, db)
}, err => {
  if(err) {
    console.log("Connectivity problem with mongo")
  } else {
    console.log('hello')
  }
})

app.listen(port, () => {
  console.log('Hello there, General ' + port)
})
