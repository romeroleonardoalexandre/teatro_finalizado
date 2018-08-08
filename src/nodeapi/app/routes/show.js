var ObjectId = require('mongodb').ObjectID

module.exports = (app, db) => {

  let collection = db.collection("show")

  app.get('/shows', (req, res) => {
    collection.find({}).toArray((err, items) => {
      if(!err) {
        res.status(200).send(items)
      }
    })
  })

  app.post('/getshow', (req, res) => {
    collection.findOne({_id: req.body.id}, (err, result) => {
      res.status(200).send(result)
    })
  })

  app.post('/show', (req, res) => {
    let toBeSaved = req.body
    if(toBeSaved._id) {
      toBeSaved._id = toBeSaved._id
    }
    collection.save(toBeSaved)
    res.end()
  })

  app.delete('/show', (req, res) => {
    collection.remove({_id: req.body.id}, (err, obj) => {
      if(!err) console.log("Deleted show: " + req.body.id)
      res.end()
    })
  })

  app.post('/sell', (req, res) => {
    let updateObjs = req.body.map(sale => {
      return {
        toUpdate: sale.show,
        updateObj: {$push: {sales: sale}}
      }
    })
    updateObjs.forEach(obj => {
      collection.update({_id: obj.toUpdate}, obj.updateObj, (err, result) => {
        if(!err) console.log("Sold at: " + obj.toUpdate)
        res.end()
      })
    })
  })

}
