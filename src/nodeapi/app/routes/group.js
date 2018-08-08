var ObjectId = require('mongodb').ObjectID

module.exports = (app, db) => {

  let collection = db.collection("group")

  app.get('/groups', (req, res) => {
    collection.find({}).toArray((err, items) => {
      if(!err) {
        res.json({rooms: items})
      }
    })
  })

  app.get('/group', (req, res) => {
    collection.findOne({_id: req.body.id}, (err, result) => {
      res.json(result)
    })
  })

  app.post('/group', (req, res) => {
    let toBeSaved = req.body
    if(toBeSaved._id) {
      toBeSaved._id = toBeSaved._id
    }
    collection.save(toBeSaved)
    res.end()
  })

  app.delete('/group', (req, res) => {
    collection.remove({_id: req.body.id}, (err, obj) => {
      if(!err) console.log("Deleted group: " + req.body.id)
    })
    res.end()
  })

}
