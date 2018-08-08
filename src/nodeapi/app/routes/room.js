var ObjectId = require('mongodb').ObjectID

module.exports = (app, db) => {

  let collection = db.collection("room")

  app.get('/rooms', (req, res) => {
    collection.find({}).toArray((err, items) => {
      if(!err) {
        res.status(200).send(items)
      }
    })
  })

  app.post('/getroom', (req, res) => {
    console.log("Getting room: " + req.body.id)
    collection.findOne({_id: req.body.id}, (err, result) => {
      res.json(result)
    })
  })

  app.post('/room', (req, res) => {
    let toBeSaved = req.body
    if(toBeSaved._id) {
      toBeSaved._id = toBeSaved._id
    }
    collection.save(toBeSaved)
    res.end()
  })

  app.delete('/room', (req, res) => {
    collection.remove({_id: req.body.id}, (err, obj) => {
      if(!err) console.log("Deleted room: " + req.body.id)
    })
    res.end()
  })

}
